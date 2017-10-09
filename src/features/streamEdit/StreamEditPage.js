import React, { Component } from 'react';
import { Notification } from 'rxjs/Notification';
import 'rxjs/add/operator/debounceTime';

import DebounceTimeOperator from '../../utils/DebounceTimeOperator';

class StreamEditPage extends Component {
  render() {
    const inputMessages = [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 60, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 500, notification: Notification.createComplete() },
    ];
    const outputMessages = new DebounceTimeOperator(100).simulate(inputMessages);

    console.log('outputMessages', outputMessages);

    return (
      <div>
        <h1>StreamEditPage</h1>
      </div>
    );
  }
}

export default StreamEditPage;
