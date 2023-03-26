import {BehaviorCollection} from '../BehaviorCollection';
import {EntityCollection} from '../../EntityCollection';
import {System} from '../../System';
import {BehaviorTree} from '../components';
import {ManagerBehavior} from '../behaviors';

export class BehaviorSystem extends System {
  private behaviors: BehaviorCollection;

  constructor() {
    super();

    this.behaviors = new BehaviorCollection([
      ManagerBehavior,
      new ManagerBehavior(),
    ]);
  }

  update(entities: EntityCollection): void {
    entities.forEach((components, entity) => {
      const constructor = components.get(BehaviorTree)?.data?.behavior;

      if (constructor) {
        const behaviorTree = this.behaviors.get(constructor);

        if (behaviorTree) {
          behaviorTree.tick(entity, entities);
        }
      }
    });
  }
}
