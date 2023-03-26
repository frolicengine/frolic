import {PrimitiveMoveable} from './components';
import {PropertyOf} from '../Component';
import {Tick} from './Behavior';
import {CommandSystem} from './systems/CommandSystem';

enum NodeStatus {
  SUCCESS,
  FAILED,
  RUNNING,
}

export const ControlEntityNode = (): Tick => (entity, entities) => {
  CommandSystem.getInstance().controlEntity(entity, entities);
  return NodeStatus.RUNNING;
};

export const MoveEntityNode =
  (direction: PropertyOf<PrimitiveMoveable, 'direction'>): Tick =>
  (entity, entities) => {
    CommandSystem.getInstance().moveEntity(direction, entity, entities);
    return NodeStatus.RUNNING;
  };
