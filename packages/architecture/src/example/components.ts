import {BehaviorState} from './systems/BehaviorSystem';
import {Component} from '../ecs/Component';
import BehaviorTreeBuilder from '../bt/BehaviorTreeBuilder';
import BehaviorTreeNodeInterface from '../bt/Node/BehaviorTreeNodeInterface';

/**
 * Converts an entity to a controlled player
 */
export class Controllable extends Component<
  Readonly<{
    id?: number;
  }>
> {}

/**
 * Gives an entity a name
 */
export class Name extends Component<
  Readonly<{
    name: string;
  }>
> {}

/**
 * Position an entity in the world
 */
export class Position extends Component<
  Readonly<{
    x: number;
    y: number;
  }>
> {}

/**
 * Allow an entity to move
 */
export class Moveable extends Component<
  Readonly<{
    velocity: number;
    acceleration: number;
  }>
> {}

/**
 * Allow an entity to move
 */
export class PrimitiveMoveable extends Component<
  Readonly<{
    direction: 'left' | 'right' | 'up' | 'down' | null;
  }>
> {}

/**
 * Make entity visible
 */
export class PrimitiveAppearance extends Component<
  Readonly<{
    character: 'A' | 'B';
  }>
> {}

/**
 * Allows entity to queue commands
 */
type QueueBasedData = Readonly<{
  queue: {
    [key: number]: () => void;
  };
  head: number;
  tail: number;
}>;
export class QueueBased extends Component<QueueBasedData> {
  constructor(
    data: QueueBasedData = {
      queue: {},
      head: 0,
      tail: 0,
    }
  ) {
    super(data);
  }
}

/**
 * Grants a behavior tree to entity
 */
export class Behavior extends Component<
  Readonly<{
    behaviorBuilder: () => BehaviorTreeBuilder<BehaviorState>;
    treeRootNode: BehaviorTreeNodeInterface<BehaviorState> | null;
  }>
> {}
