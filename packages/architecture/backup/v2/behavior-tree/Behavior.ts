import {EntityCollection} from '../EntityCollection';
import {Entity} from '../Entity';

export interface BehaviorConstructor {
  new (...args: any): Behavior;
}

export abstract class Behavior implements IBehavior {
  tick(entity: Entity, entities: EntityCollection): void {
    console.log(entity, entities);
  }
}

export interface IBehavior {
  tick: Tick;
}

export interface Tick {
  (entity: Entity, entities: EntityCollection): void;
}
