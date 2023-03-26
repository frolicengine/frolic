import {Component, componentFactory} from '../Component';

/**
 * Empty Data Anonymous Class Component
 */
export const Player = componentFactory('Player');

/**
 * Anonymous Class Component
 */
export const NameSymbol = Symbol();
export const Name = componentFactory<
  Readonly<{
    name: string;
  }>
>(NameSymbol);

/**
 * Destructured Anonymous Class Component
 */
export const PositionSymbol = Symbol('Position');
export const Position = componentFactory<IPosition>(PositionSymbol);
export type IPosition = Readonly<{
  x: number;
  y: number;
}>;

/**
 * Extended Class Component
 */
export class Movement extends Component<
  Readonly<{
    acceleration: number;
    velocity: number;
  }>
> {
  static readonly symbol = Symbol('Movement');
}
