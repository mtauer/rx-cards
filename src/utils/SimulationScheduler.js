import { VirtualTimeScheduler } from 'rxjs/scheduler/VirtualTimeScheduler';
import { HotObservable } from 'rxjs/testing/HotObservable';
import { Notification } from 'rxjs/Notification';

class SimulationScheduler extends VirtualTimeScheduler {
  constructor() {
    super();
    this.hotObservables = [];
  }

  createHotObservable(messages) {
    const hotObservable = new HotObservable(messages, this);
    this.hotObservables.push(hotObservable);
    return hotObservable;
  }

  simulate(observable) {
    const outputMessages = [];
    this.schedule(() => {
      observable.subscribe((x) => {
        outputMessages.push({ frame: this.frame, notification: Notification.createNext(x) });
      }, (err) => {
        outputMessages.push({ frame: this.frame, notification: Notification.createError(err) });
      }, () => {
        outputMessages.push({ frame: this.frame, notification: Notification.createComplete() });
      });
    }, 0);
    this.hotObservables.forEach((hotObservable) => {
      hotObservable.setup();
    });
    this.hotObservables = [];
    super.flush();
    return outputMessages;
  }
}

export default SimulationScheduler;
