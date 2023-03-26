import {MoveEntityCommand} from '../commands';
import {System} from '../../System';
import {EntityCollection} from '../../EntityCollection';
import {PrimitiveMoveable, Position} from '../components';
import {PropertyOf} from '../../Component';
import {Entity} from '../../Entity';

export class PrimitiveMovementSystem
  extends System
  implements MoveEntityCommand
{
  update(entities: EntityCollection): void {
    entities.forEach((components, entity) => {
      if (components.has(Position) && components.has(PrimitiveMoveable)) {
        const position = components.get(Position);
        const moveable = components.get(PrimitiveMoveable);

        let x = position?.data.x || 0;
        let y = position?.data.y || 0;

        switch (moveable?.data.direction) {
          case 'left':
            if (x > 0) {
              x -= 1;
            }
            break;
          case 'right':
            if (x < 3) {
              x += 1;
            }
            break;
          case 'up':
            if (y > 0) {
              y -= 1;
            }
            break;
          case 'down':
            if (y < 1) {
              y += 1;
            }
            break;
        }

        entities.get(entity)?.set(Position, new Position({x, y}));
      }
    });
  }

  moveEntity(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entity: Entity,
    entities: EntityCollection
  ): void {
    const components = entities.get(entity);

    if (components?.has(PrimitiveMoveable)) {
      components?.set(PrimitiveMoveable, new PrimitiveMoveable({direction}));
    }
  }
}
