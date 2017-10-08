import { compose, createStore } from 'redux';

import rootReducer from './rootReducer';

export default createStore(
  rootReducer,
  compose(
    /* eslint-disable no-underscore-dangle */
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined')
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable no-underscore-dangle */
  ),
);
