import {IComponentWithSymbol, ComponentCollection} from './Component';

export class ComponentsManager {
  constructor(private collection: ComponentCollection) {}

  get<C extends IComponentWithSymbol>(constructor: C): InstanceType<C> {
    if (!this.has(constructor)) {
      throw new Error('component not found');
    }

    const symbol = this.symbol(constructor);
    const component = this.collection[symbol];
    return component as InstanceType<C>;
  }

  set<C extends IComponentWithSymbol>(
    constructor: C,
    data: ConstructorParameters<C>[0]
  ): void {
    if (!this.has(constructor)) {
      throw new Error('component not found');
    }

    const symbol = this.symbol(constructor);
    this.collection[symbol] = new constructor(data);
  }

  add<C extends IComponentWithSymbol>(
    constructor: C,
    data: ConstructorParameters<C>[0]
  ): void {
    if (this.has(constructor)) {
      throw new Error('component cannot be added more than once');
    }

    const symbol = this.symbol(constructor);
    this.collection[symbol] = new constructor(data);
  }

  remove<C extends IComponentWithSymbol>(constructor: C): void {
    if (!this.has(constructor)) {
      throw new Error('component not found');
    }

    const symbol = this.symbol(constructor);
    delete this.collection[symbol];
  }

  has<C extends IComponentWithSymbol>(constructor: C): boolean {
    const symbol = this.symbol(constructor);
    return typeof this.collection[symbol] !== 'undefined';
  }

  symbol<C extends IComponentWithSymbol>(constructor: C): symbol {
    return constructor.symbol;
  }
}
