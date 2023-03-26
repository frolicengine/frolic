import {ComponentsManager} from '../ComponentsManager';
import {EntityCollection} from '../Entity';
import {Movement, Name, Player} from './components';

export const consoleNameSystemUpdate = (entities: EntityCollection) => {
  for (const id in entities) {
    const components = entities[id];
    const manager = new ComponentsManager(components);

    if (manager.has(Name)) {
      const nameComponent = manager.get(Name);
      console.log('name: ', nameComponent.data.name);
    }
  }
};

export const playerSystemUpdate = (entities: EntityCollection) => {
  for (const id in entities) {
    const components = entities[id];
    const manager = new ComponentsManager(components);

    if (manager.has(Player)) {
      if (manager.has(Name)) {
        console.log(`${manager.get(Name).data.name} moved left`);
      } else {
        console.log(`player[${id}] moved left`);
      }

      if (manager.has(Movement)) {
        manager.set(Movement, {acceleration: 0, velocity: 0});
      }
    }
  }
};
