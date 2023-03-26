import {PropertyOf} from '../Component';
import {Entity} from '../Entity';
import {EntityCollection} from '../EntityCollection';
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
