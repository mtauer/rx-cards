import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import StreamEditPage from './features/streamEdit/StreamEditPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StreamEditPage />
      </Provider>
    );
  }
}

export default App;
