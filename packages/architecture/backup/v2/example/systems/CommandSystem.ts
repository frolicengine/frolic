import {EntityCollection} from '../../EntityCollection';
import {CoreCommandSystem} from '../../CoreCommandSystem';
import {ControlEntityCommand, MoveEntityCommand} from '../commands';
import {PlayerSystem, PrimitiveMovementSystem} from '../systems';
import {PrimitiveRenderSystem} from './PrimitiveRenderSystem';
import {PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../Component';

export class CommandSystem
  extends CoreCommandSystem
  implements ControlEntityCommand, MoveEntityCommand
{
  protected static instance: CommandSystem;

  constructor() {
    super(
      [PlayerSystem, new PlayerSystem()],
      [PrimitiveMovementSystem, new PrimitiveMovementSystem()],
      [PrimitiveRenderSystem, new PrimitiveRenderSystem()]
    );
  }

  static getInstance(): CommandSystem {
    if (!this.instance) {
      this.instance = new CommandSystem();
    }

    return this.instance;
  }

  update(entities: EntityCollection) {
    this.systems.get(PlayerSystem)?.update(entities);
    this.systems.get(PrimitiveMovementSystem)?.update(entities);
    this.systems.get(PrimitiveRenderSystem)?.update(entities);
  }

  controlEntity(entity: number, entities: EntityCollection) {
    this.systems.get(PlayerSystem)?.controlEntity(entity, entities);
  }

  moveEntity(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entities: EntityCollection
  ): void {
    this.systems.get(PlayerSystem)?.moveEntity(direction, entities);
  }
}
