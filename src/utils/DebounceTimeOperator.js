import 'rxjs/add/operator/debounceTime';

import SimulationScheduler from './SimulationScheduler';

class DebounceTimeOperator {
  constructor(timeInMs) {
    this.timeInMs = timeInMs;
  }

  simulate(messages) {
    const scheduler = new SimulationScheduler();
    const input$ = scheduler.createHotObservable(messages);
    const observable = input$.debounceTime(this.timeInMs, scheduler);
    return scheduler.simulate(observable);
  }
}

export default DebounceTimeOperator;
