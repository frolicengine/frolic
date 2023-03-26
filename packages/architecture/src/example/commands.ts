import {PropertyOf} from '../ecs/Component';
import {Entity} from '../ecs/Entity';
import {EntityCollection} from '../ecs/EntityCollection';
import {PrimitiveMoveable} from './components';

export interface ControlEntityCommand {
  controlEntity(entity: Entity, entities: EntityCollection): void;
}

export interface MoveEntityCommand {
  moveEntity(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entity: Entity,
    entities: EntityCollection
  ): void;
}

export interface MovePlayerCommand {
  movePlayer(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entities: EntityCollection
  ): void;
}

export interface EnqueueEntityTaskCommand {
  enqueueEntityTask(
    task: () => void,
    entity: Entity,
    entities: EntityCollection
  ): void;
}
