import {Behavior, BehaviorConstructor} from './Behavior';

export class BehaviorCollection extends Map<
  BehaviorCollectionKey,
  BehaviorCollectionValue
> {
  constructor(...entries: BehaviorCollectionKeyValue[]) {
    super(entries);
  }

  has<T extends BehaviorCollectionKey>(key: T) {
    return typeof this.get<T>(key) !== 'undefined';
  }

  get<T extends BehaviorCollectionKey>(key: T): InstanceType<T> | undefined {
    return super.get(key) as InstanceType<T> | undefined;
  }

  set<T extends BehaviorCollectionKey>(key: T, value: InstanceType<T>) {
    super.set(key, value);
    return this;
  }
}

export type BehaviorCollectionKey = BehaviorConstructor;
export type BehaviorCollectionValue = Behavior | undefined;

export type BehaviorCollectionKeyValue = [
  BehaviorCollectionKey,
  BehaviorCollectionValue
];
