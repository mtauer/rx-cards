import React, { Component } from 'react';
import Rx from 'rxjs/Rx';
import { VirtualTimeScheduler } from 'rxjs/scheduler/VirtualTimeScheduler';
import { HotObservable } from 'rxjs/testing/HotObservable';

class StreamEditPage extends Component {
  render() {
    /*

    Example implementation of an operator object

    const scheduler = new SimulationScheduler();
    const hotInput = scheduler.hotObservable(inputMessages);
    const observable = hotInput.debounceTime(100, scheduler);
    const outputMessages = scheduler.simulate();

    Usage example of an operator object

    const output = DebouneOperator.simulate(inputs);

    */

    const scheduler = new VirtualTimeScheduler();
    const messages = [
      { frame: 40, notification: Rx.Notification.createNext(1) },
      { frame: 60, notification: Rx.Notification.createNext(2) },
      { frame: 80, notification: Rx.Notification.createNext(3) },
      { frame: 500, notification: Rx.Notification.createComplete() },
    ];
    const hotObservable = new HotObservable(messages, scheduler);
    const observable = hotObservable.debounceTime(100, scheduler);
    const output = [];
    scheduler.schedule(() => {
      observable.subscribe((x) => {
        output.push({ frame: scheduler.frame, notification: Rx.Notification.createNext(x) });
      }, (err) => {
        output.push({ frame: scheduler.frame, notification: Rx.Notification.createError(err) });
      }, () => {
        output.push({ frame: scheduler.frame, notification: Rx.Notification.createComplete() });
      });
    }, 0);

    hotObservable.setup();
    scheduler.flush();

    console.log('output', output);

    return (
      <div>
        <h1>StreamEditPage</h1>
      </div>
    );
  }
}

export default StreamEditPage;
