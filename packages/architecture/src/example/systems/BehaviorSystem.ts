import StateData from '../../bt/StateData';
import {EntityCollection} from '../../ecs/EntityCollection';
import {System} from '../../ecs/System';
import {Behavior} from '../components';

export interface BehaviorState {
  entity: number;
  entities: EntityCollection;
}

export class BehaviorSystem extends System {
  constructor() {
    super();
  }

  build(entities: EntityCollection) {
    entities.forEach(components => {
      const behaviorData = components.get(Behavior)?.data;
      const treeRootNode = behaviorData?.treeRootNode;
      const behaviorBuilder = behaviorData?.behaviorBuilder;

      if (treeRootNode === null && behaviorBuilder) {
        components.set(
          Behavior,
          new Behavior({
            behaviorBuilder,
            treeRootNode: behaviorBuilder().build(),
          })
        );
      }
    });
  }

  update(entities: EntityCollection, deltaTime: number): void {
    entities.forEach((components, entity) => {
      const treeRootNode = components.get(Behavior)?.data?.treeRootNode;

      if (treeRootNode) {
        treeRootNode.tick(new StateData({entity, entities}, deltaTime));
      }
    });
  }
}
