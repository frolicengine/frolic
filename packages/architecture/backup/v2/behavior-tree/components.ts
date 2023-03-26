import {Component} from '../Component';
import {BehaviorCollectionKey} from './BehaviorCollection';

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

export class BehaviorTree extends Component<
  Readonly<{
    behavior: BehaviorCollectionKey;
  }>
> {}
