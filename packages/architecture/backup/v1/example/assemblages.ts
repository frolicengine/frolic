import {Component} from '../Component';
import {
  IPosition,
  Movement,
  Name,
  PositionSymbol,
  Position,
} from './components';

export const Hero = (
  //anonymous
  name: InstanceType<typeof Name>,
  //destructed
  position: Component<IPosition>,
  //class
  movement: Movement
) => ({
  [Name.symbol]: name,
  [PositionSymbol]: position,
  [Movement.symbol]: movement,
});

export const Wall = (position: Component<IPosition>) => ({
  [Position.symbol]: position,
});
