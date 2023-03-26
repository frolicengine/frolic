import {EntityCollection} from './../../ecs/EntityCollection';
import {BehaviorState} from './../systems/BehaviorSystem';
import {commands} from './../systems/CommandSystem';
import BehaviorTreeBuilder from '../../bt/BehaviorTreeBuilder';
import BehaviorTreeStatus from '../../bt/BehaviorTreeStatus';
import {Position, PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../ecs/Component';

export const createSearchBehaviorBuilder = () =>
  new BehaviorTreeBuilder<BehaviorState>()
    .sequence('MOVE')
    .condition('IS_FIRST_SLOT', async ({state}) => {
      const {x, y} = position(state);
      console.log('IS_FIRST_SLOT', state.entity, {x, y});
      return x === 0 && y === 0;
    })
    .do('MOVE_ENTITY_RIGHT', async ({state: {entity, entities}}) => {
      console.log('MOVE_ENTITY_RIGHT', entity);
      commands.moveEntity('right', entity, entities);
      return BehaviorTreeStatus.Success;
    })
    .condition('IS_SECOND_SLOT', async ({state}) => {
      const {x, y} = position(state);
      console.log('IS_SECOND_SLOT', state.entity, {x, y});
      return x === 1 && y === 0;
    })
    .do('MOVE_ENTITY_DOWN', async ({state: {entity, entities}}) => {
      commands.moveEntity('down', entity, entities);
      return BehaviorTreeStatus.Success;
    })
    .condition('IS_SIXTH_SLOT', async ({state}) => {
      const {x, y} = position(state);
      return x === 1 && y === 1;
    })
    .do('MOVE_ENTITY_LEFT', async ({state: {entity, entities}}) => {
      commands.moveEntity('left', entity, entities);
      return BehaviorTreeStatus.Success;
    })
    .condition('IS_FIFTH_SLOT', async ({state}) => {
      const {x, y} = position(state);
      return x === 0 && y === 1;
    })
    .do('MOVE_ENTITY_UP', async ({state: {entity, entities}}) => {
      commands.moveEntity('up', entity, entities);
      return BehaviorTreeStatus.Success;
    })
    .end();

const position = ({entity, entities}: BehaviorState) =>
  entities.get(entity)?.get(Position)?.data ?? {x: 0, y: 0};
