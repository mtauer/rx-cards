import 'rxjs/add/operator/debounceTime';

import SimulationScheduler from './SimulationScheduler';

class Operator {
  constructor(type, options) {
    this.type = type;
    this.options = options;
  }

  simulate(inputMessages) {
    const { type, options } = this;
    const scheduler = new SimulationScheduler();
    const input$Array = inputMessages
      .map(messages => scheduler.createHotObservable(messages));
    let observable;
    switch (type) {
      case 'debounceTime':
        observable = input$Array[0].debounceTime(options.dueTime, scheduler);
        break;
      case 'buffer':
        observable = input$Array[0].buffer(input$Array[1]);
        break;
      case 'map':
        observable = input$Array[0].map(options.project);
        break;
      default:
        observable = input$Array[0];
        break;
    }
    return [scheduler.simulate(observable)];
  }
}

export default Operator;
