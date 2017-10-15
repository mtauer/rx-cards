import { combineEpics } from 'redux-observable';

import { createSimulateMessagesEpic } from './features/streamEdit/redux';

const rootEpic = combineEpics(
  createSimulateMessagesEpic(),
);

export default rootEpic;
