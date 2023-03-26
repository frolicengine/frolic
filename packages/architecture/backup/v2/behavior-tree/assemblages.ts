import {ComponentCollection} from '../ComponentCollection';
import {
  Name,
  Position,
  PrimitiveMoveable,
  PrimitiveAppearance,
} from './components';

export const Hero = (
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

export const Wall = (position: Position, appearance: PrimitiveAppearance) =>
  new ComponentCollection(
    [Position, position],
    [PrimitiveAppearance, appearance]
  );
