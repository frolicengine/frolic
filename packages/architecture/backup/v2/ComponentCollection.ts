import {Component, ComponentConstructor} from './Component';

export class ComponentCollection extends Map<
  ComponentCollectionKey,
  ComponentCollectionValue
> {
  constructor(...entries: ComponentCollectionKeyValue[]) {
    super(entries);
  }

  has<T extends ComponentCollectionKey>(key: T) {
    return typeof this.get<T>(key) !== 'undefined';
  }

  get<T extends ComponentCollectionKey>(key: T): InstanceType<T> | undefined {
    return super.get(key) as InstanceType<T> | undefined;
  }

  set<T extends ComponentCollectionKey>(key: T, value: InstanceType<T>) {
    super.set(key, value);
    return this;
  }
}

export type ComponentCollectionKey = ComponentConstructor;
export type ComponentCollectionValue = Component | undefined;

export type ComponentCollectionKeyValue = [
  ComponentCollectionKey,
  ComponentCollectionValue
];
