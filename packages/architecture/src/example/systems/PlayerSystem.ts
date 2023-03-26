import {CommandSystem} from './CommandSystem';
import {MovePlayerCommand} from '../commands';
import {EntityCollection} from '../../ecs/EntityCollection';
import {System} from '../../ecs/System';
import {ControlEntityCommand} from '../commands';
import {Controllable, PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../ecs/Component';

export class PlayerSystem
  extends System
  implements ControlEntityCommand, MovePlayerCommand
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

  movePlayer(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entities: EntityCollection
  ): void {
    const player = this.getPlayer(entities);

    if (player !== null) {
      CommandSystem.getInstance().moveEntity(direction, player, entities);
    }
  }

  private getPlayer(entities: EntityCollection): number | null {
    let player: number | null = null;

    entities.forEach((components, entity) => {
      components.has(Controllable) && (player = entity);
    });

    return player;
  }
}
