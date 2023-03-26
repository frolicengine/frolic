import {ComponentCollection} from './Component';
import {Entity, EntityCollection} from './Entity';

export class EntitiesManager {
  constructor(public readonly collection: EntityCollection) {}

  get(entity: Entity) {
    if (!this.has(entity)) {
      throw new Error('entity not found');
    }

    return this.collection[entity];
  }

  add<C extends ComponentCollection>(entity: Entity, collection?: C) {
    if (this.has(entity)) {
      throw new Error('entity already exists');
    }

    this.collection[entity] = collection || {};
  }

  remove(entity: Entity) {
    if (!this.has(entity)) {
      throw new Error('entity not found');
    }

    delete this.collection[entity];
  }

  has(entity: Entity): boolean {
    return Object.prototype.hasOwnProperty.call(this.collection, entity);
  }
}
