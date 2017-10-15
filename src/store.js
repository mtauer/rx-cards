import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
    /* eslint-disable no-underscore-dangle */
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined')
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable no-underscore-dangle */
  ),
);
