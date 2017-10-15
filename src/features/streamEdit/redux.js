import Rx from 'rxjs/Rx';
import { Notification } from 'rxjs/Notification';
import { createSelector } from 'reselect';
import _ from 'lodash';

// Initial state

export const STREAM_TYPE_INPUT = 'input';
export const STREAM_TYPE_OUTPUT = 'output';

const initialState = {
  streams: {
    input: {
      id: 'input',
      title: 'Input Stream',
    },
    'debounceTime-1_output-1': {
      id: 'debounceTime-1_output-1',
      title: 'Debounced Stream 1',
    },
    'buffer-1_output-1': {
      id: 'buffer-1_output-1',
      title: 'Buffered Stream 1',
    },
  },
  definedStreamsMessages: {
    input: [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 60, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 150, notification: Notification.createNext(4) },
      { frame: 280, notification: Notification.createNext(4) },
      { frame: 500, notification: Notification.createComplete() },
    ],
  },
  streamsMessages: {},
  operators: {
    'buffer-1': {
      id: 'buffer-1',
      type: 'buffer',
      options: {},
      ioStreams: [
        { streamId: 'input', type: STREAM_TYPE_INPUT },
        { streamId: 'debounceTime-1_output-1', type: STREAM_TYPE_INPUT },
        { streamId: 'buffer-1_output-1', type: STREAM_TYPE_OUTPUT },
      ],
    },
    'debounceTime-1': {
      id: 'debounceTime-1',
      type: 'debounceTime',
      options: {
        dueTime: 100,
      },
      ioStreams: [
        { streamId: 'input', type: STREAM_TYPE_INPUT },
        { streamId: 'debounceTime-1_output-1', type: STREAM_TYPE_OUTPUT },
      ],
    },
  },
};

// Action Types

const PREFIX = 'streamEdit/';
export const SET_STREAMS_MESSAGES_ACTION = `${PREFIX}SET_STREAMS_MESSAGES_ACTION`;

// Action Creators

export function setStreamsMessagesAction(streamsMessages) {
  return { type: SET_STREAMS_MESSAGES_ACTION, streamsMessages };
}

// Reducer

export default function streamEditReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STREAMS_MESSAGES_ACTION:
      return {
        ...state,
        streamsMessages: action.streamsMessages,
      };
    default:
      return state;
  }
}

// Epics

export function createSimulateMessagesEpic() {
  return (action$, store) =>
    Rx.Observable.of(null)
      .map(() => {
        const streamsMessages = getStreamsMessages(store.getState());
        return setStreamsMessagesAction(streamsMessages);
      });
}

// Selectors

const getDefinedStreamsMessages = state => state.streamEdit.definedStreamsMessages;
const getOperatorsArray = state => _.values(state.streamEdit.operators);

export const getStreamsMessages = createSelector(
  [getDefinedStreamsMessages, getOperatorsArray],
  (definedStreamsMessages, operatorsArray) => {
    console.log('getStreamsMessages', definedStreamsMessages, operatorsArray);
    const streamsMessages = {
      ...definedStreamsMessages,
    };
    return streamsMessages;
  },
);
