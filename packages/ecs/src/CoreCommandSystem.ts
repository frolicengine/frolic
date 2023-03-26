import {System} from './System';
import {SystemCollection, SystemCollectionKeyValue} from './SystemCollection';

export class CoreCommandSystem extends System {
  protected static instance: CoreCommandSystem;
  protected readonly systems: SystemCollection;

  constructor(...systems: SystemCollectionKeyValue[]) {
    super();
    this.systems = new SystemCollection(systems);
  }

  static getInstance(): CoreCommandSystem {
    if (!this.instance) {
      this.instance = new CoreCommandSystem();
    }

    return this.instance;
  }
}
