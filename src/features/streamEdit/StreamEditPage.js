import React, { Component } from 'react';
import { Notification } from 'rxjs/Notification';
import 'rxjs/add/operator/debounceTime';

import SimulationScheduler from '../../utils/SimulationScheduler';

class StreamEditPage extends Component {
  render() {
    /*

    Example implementation of an operator object

    const scheduler = new SimulationScheduler();
    const hotInput = scheduler.createHotObservable(inputMessages);
    const observable = hotInput.debounceTime(100, scheduler);
    const outputMessages = scheduler.simulate(observable);

    Usage example of an operator object

    const output = DebouneOperator.simulate(inputs);

    */

    const scheduler = new SimulationScheduler();
    const messages = [
      { frame: 40, notification: Notification.createNext(1) },
      { frame: 60, notification: Notification.createNext(2) },
      { frame: 80, notification: Notification.createNext(3) },
      { frame: 500, notification: Notification.createComplete() },
    ];
    const hotObservable = scheduler.createHotObservable(messages);
    const input = hotObservable.debounceTime(100, scheduler);
    const output = scheduler.simulate(input);

    console.log('output', output);

    return (
      <div>
        <h1>StreamEditPage</h1>
      </div>
    );
  }
}

export default StreamEditPage;
