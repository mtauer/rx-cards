import React, { Component } from 'react';
import { Notification } from 'rxjs/Notification';
import 'rxjs/add/operator/debounceTime';

import DebounceTimeOperator from '../../utils/DebounceTimeOperator';
import StreamChart from '../../components/StreamChart';
import OperatorCard from './OperatorCard';

import './StreamEditPage.css';

class StreamEditPage extends Component {
  render() {
    const inputMessages = [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 60, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 150, notification: Notification.createNext(4) },
      { frame: 280, notification: Notification.createNext(4) },
      { frame: 500, notification: Notification.createComplete() },
    ];
    const outputMessages = new DebounceTimeOperator(100).simulate(inputMessages);

    return (
      <div className="content-wrapper">
        <h1>StreamEditPage</h1>
        <div className="operators">
          <div className="operator-container">
            <StreamChart
              width="300"
              height="40"
              messages={inputMessages}
              label="Input Stream"
            />
            <OperatorCard title="DebounceTime" />
            <StreamChart
              width="300"
              height="40"
              messages={outputMessages}
              label="Debounced Stream 01"
            />
          </div>
          <div className="operator-container">
            <StreamChart
              width="300"
              height="40"
              messages={inputMessages}
              label="Input Stream"
            />
            <OperatorCard title="Buffer" />
            <StreamChart
              width="300"
              height="40"
              messages={outputMessages}
              label="Output Stream"
            />
          </div>
        </div>
      </div>
    );
  }
}


export default StreamEditPage;
