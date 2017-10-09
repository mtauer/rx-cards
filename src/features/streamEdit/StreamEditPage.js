import React, { Component } from 'react';
import { Notification } from 'rxjs/Notification';
import 'rxjs/add/operator/debounceTime';

import DebounceTimeOperator from '../../utils/DebounceTimeOperator';
import ObservableChart from '../../components/ObservableChart';

class StreamEditPage extends Component {
  render() {
    const inputMessages = [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 60, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 150, notification: Notification.createNext(4) },
      { frame: 500, notification: Notification.createComplete() },
    ];
    const outputMessages = new DebounceTimeOperator(100).simulate(inputMessages);

    console.log('outputMessages', outputMessages);

    return (
      <div className="content-wrapper">
        <h1>StreamEditPage</h1>
        <ObservableChart width="800" height="30" data={inputMessages} />
        <p className="operator-name">DebounceTime 100</p>
        <ObservableChart width="800" height="30" data={outputMessages} />
      </div>
    );
  }
}


export default StreamEditPage;
