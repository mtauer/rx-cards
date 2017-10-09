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
    const output = [];
    this.schedule(() => {
      observable.subscribe((x) => {
        output.push({ frame: this.frame, notification: Notification.createNext(x) });
      }, (err) => {
        output.push({ frame: this.frame, notification: Notification.createError(err) });
      }, () => {
        output.push({ frame: this.frame, notification: Notification.createComplete() });
      });
    }, 0);
    this.hotObservables.forEach((hotObservable) => {
      hotObservable.setup();
    });
    this.hotObservables = [];
    super.flush();
    return output;
  }
}

export default SimulationScheduler;
