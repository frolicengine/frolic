import {ComponentCollection} from './ComponentCollection';
import {Entity} from './Entity';

export class EntityCollection extends Map<Entity, ComponentCollection> {
  constructor(...entries: EntityCollectionKeyValue[]) {
    super(entries);
  }
}

export type EntityCollectionKey = Entity;
export type EntityCollectionValue = ComponentCollection;

export type EntityCollectionKeyValue = [
  EntityCollectionKey,
  EntityCollectionValue
];
