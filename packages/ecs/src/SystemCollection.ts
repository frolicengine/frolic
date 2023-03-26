import {System, SystemConstructor} from './System';

export class SystemCollection extends Map<
  SystemCollectionKey,
  SystemCollectionValue
> {
  has<T extends SystemCollectionKey>(key: T) {
    return typeof this.get<T>(key) !== 'undefined';
  }

  get<T extends SystemCollectionKey>(key: T): InstanceType<T> | undefined {
    return super.get(key) as InstanceType<T> | undefined;
  }

  set<T extends SystemCollectionKey>(key: T, value: InstanceType<T>) {
    super.set(key, value);
    return this;
  }
}

export type SystemCollectionKey = SystemConstructor;
export type SystemCollectionValue = System | undefined;

export type SystemCollectionKeyValue = [
  SystemCollectionKey,
  SystemCollectionValue
];
