import {ComponentCollection} from './Component';
import {EntitiesManager} from './EntitiesManager';
import {Entity, EntityCollection} from './Entity';
/**
 *
 * Testing
 */
export class ESCManager {
  private nextEntity: Entity = 0;
  private entitiesManager: EntitiesManager;

  constructor(entities: EntityCollection) {
    this.entitiesManager = new EntitiesManager(entities);
  }

  addEntity(components?: ComponentCollection) {
    const entity = this.nextEntity;
    this.nextEntity++;
    this.entitiesManager.add(entity, components);
    return entity;
  }

  removeEntity(id: Entity) {
    this.entitiesManager.remove(id);
  }
}
