import { combineReducers } from 'redux';

import streamEditReducer from './features/streamEdit/redux';

const rootReducer = combineReducers({
  streamEdit: streamEditReducer,
});

export default rootReducer;
