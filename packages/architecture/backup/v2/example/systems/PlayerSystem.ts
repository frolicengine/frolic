import {MoveEntityCommand} from './../commands';
import {EntityCollection} from '../../EntityCollection';
import {System} from '../../System';
import {ControlEntityCommand} from '../commands';
import {Controllable, Name, PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../Component';

export class PlayerSystem
  extends System
  implements ControlEntityCommand, MoveEntityCommand
{
  update(entities: EntityCollection): void {
    const _ = this.getPlayer(entities);
  }

  controlEntity(entity: number, entities: EntityCollection): void {
    const player = this.getPlayer(entities);
    if (player) {
      entities.get(player)?.delete(Controllable);
    }
    entities.get(entity)?.set(Controllable, new Controllable({}));
  }

  moveEntity(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entities: EntityCollection
  ): void {
    const player = this.getPlayer(entities);

    if (player !== null) {
      entities
        .get(player)
        ?.set(PrimitiveMoveable, new PrimitiveMoveable({direction}));
    }
  }

  private getPlayer(entities: EntityCollection) {
    let player: number | null = null;

    entities.forEach((components, entity) => {
      components.has(Controllable) && (player = entity);
    });

    return player;
  }
}
