import {ComponentCollection} from '../ecs/ComponentCollection';
import {
  Name,
  Position,
  PrimitiveMoveable,
  PrimitiveAppearance,
  Behavior,
  QueueBased,
} from './components';
import {createSearchBehaviorBuilder} from './behaviors/SearchBehavior';

export const HUMAN = (
  name: Name,
  position: Position,
  moveable: PrimitiveMoveable,
  appearance: PrimitiveAppearance
) =>
  new ComponentCollection(
    [Name, name],
    [Position, position],
    [PrimitiveMoveable, moveable],
    [PrimitiveAppearance, appearance]
  );

export const SearchAI = (...args: Parameters<typeof HUMAN>) => {
  const collection = HUMAN(...args);
  collection.set(
    Behavior,
    new Behavior({
      behaviorBuilder: createSearchBehaviorBuilder,
      treeRootNode: null,
    })
  );
  collection.set(QueueBased, new QueueBased());
  return collection;
};
