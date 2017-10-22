import 'rxjs';
import { Notification } from 'rxjs/Notification';
import { createSelector } from 'reselect';
import _ from 'lodash';

import Operator from '../../utils/Operator';

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
    'map-1_output-1': {
      id: 'map-1_output-1',
      title: 'Mapped Stream 1',
    },
  },
  definedStreamsMessages: {
    input: [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 63, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 150, notification: Notification.createNext(4) },
      { frame: 280, notification: Notification.createNext(5) },
      { frame: 500, notification: Notification.createComplete() },
    ],
  },
  streamsMessages: {},
  operators: {
    'map-1': {
      id: 'map-1',
      type: 'map',
      options: {
        project: a => a.length,
      },
      ioStreams: [
        { streamId: 'buffer-1_output-1', type: STREAM_TYPE_INPUT },
        { streamId: 'map-1_output-1', type: STREAM_TYPE_OUTPUT },
      ],
    },
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
        dueTime: 50,
      },
      ioStreams: [
        { streamId: 'input', type: STREAM_TYPE_INPUT },
        { streamId: 'debounceTime-1_output-1', type: STREAM_TYPE_OUTPUT },
      ],
    },
  },
  operatorsOrder: ['map-1', 'buffer-1', 'debounceTime-1'],
};

// Action Types

const PREFIX = 'streamEdit/';
export const SET_STREAMS_MESSAGES_ACTION = `${PREFIX}SET_STREAMS_MESSAGES_ACTION`;
export const SET_OPERATOR_OPTIONS = `${PREFIX}SET_OPERATOR_OPTIONS`;

// Action Creators

export function setStreamsMessagesAction(streamsMessages) {
  return { type: SET_STREAMS_MESSAGES_ACTION, streamsMessages };
}

export function setOperatorOptions(operatorId, options) {
  return { type: SET_OPERATOR_OPTIONS, operatorId, options };
}

// Reducer

export default function streamEditReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STREAMS_MESSAGES_ACTION:
      return {
        ...state,
        streamsMessages: action.streamsMessages,
      };
    case SET_OPERATOR_OPTIONS: {
      const newOperators = _.defaultsDeep({
        [action.operatorId]: {
          options: action.options,
        },
      }, { ...state.operators });
      return {
        ...state,
        operators: newOperators,
      };
    }
    default:
      return state;
  }
}

// Epics

export function createSimulateMessagesEpic() {
  return (action$, store) => action$
    .filter(action => action.type === SET_OPERATOR_OPTIONS)
    .startWith(null)
    .map(() => {
      const streamsMessages = getStreamsMessages(store.getState());
      return setStreamsMessagesAction(streamsMessages);
    });
}

// Selectors

const getDefinedStreamsMessages = state => state.streamEdit.definedStreamsMessages;
const getOperators = state => state.streamEdit.operators;
const getOperatorsOrder = state => state.streamEdit.operatorsOrder;

export const getStreamsMessages = createSelector(
  [getDefinedStreamsMessages, getOperators, getOperatorsOrder],
  (definedStreamsMessages, operators, operatorsOrder) => {
    const streamsMessages = {
      ...definedStreamsMessages,
    };
    const operatorsArray = operatorsOrder.map(id => operators[id]);
    operatorsArray.forEach(simulateOperator);
    return streamsMessages;

    function simulateOperator(operator) {
      const outputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_OUTPUT);

      // Return immediately if all output streams messages were already computed
      const outputMessages = outputStreams
        .map(s => streamsMessages[s.streamId]);
      if (_.every(outputMessages)) {
        return;
      }

      // Recursively compute all input streams messages
      const inputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_INPUT);
      const inputMessages = inputStreams
        .map((s) => {
          let messages = streamsMessages[s.streamId];
          if (!messages) {
            computeMessages(s.streamId);
            messages = streamsMessages[s.streamId];
          }
          return messages;
        });

      // Simulate operator if all messages for all input streams could be
      // calculated
      if (_.every(inputMessages)) {
        const computedOutputMessages = new Operator(operator.type, operator.options)
          .simulate(inputMessages);
        outputStreams.forEach((s, i) => {
          streamsMessages[s.streamId] = computedOutputMessages[i];
        });
      }
    }

    function computeMessages(streamId) {
      // Every stream id follows the template
      // <operator id>_<stream type>-<stream index within type>. An example
      // would be `debounceTime-1_output-1`.
      const operatorId = streamId.split('_')[0];
      const operator = operators[operatorId];
      if (operator) {
        simulateOperator(operator);
      }
    }
  },
);
