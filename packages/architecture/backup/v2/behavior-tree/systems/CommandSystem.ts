import {Entity} from '../../Entity';
import {EntityCollection} from '../../EntityCollection';
import {CoreCommandSystem} from '../../CoreCommandSystem';
import {
  ControlEntityCommand,
  MoveEntityCommand,
  MovePlayerCommand,
} from '../commands';
import {PlayerSystem, PrimitiveMovementSystem} from '../systems';
import {PrimitiveRenderSystem} from './PrimitiveRenderSystem';
import {PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../Component';
import {BehaviorSystem} from './BehaviorSystem';

export class CommandSystem
  extends CoreCommandSystem
  implements ControlEntityCommand, MoveEntityCommand, MovePlayerCommand
{
  protected static instance: CommandSystem;

  constructor() {
    super(
      [PlayerSystem, new PlayerSystem()],
      [PrimitiveMovementSystem, new PrimitiveMovementSystem()],
      [PrimitiveRenderSystem, new PrimitiveRenderSystem()],
      [BehaviorSystem, new BehaviorSystem()]
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
    this.systems.get(BehaviorSystem)?.update(entities);
  }

  controlEntity(entity: number, entities: EntityCollection) {
    this.systems.get(PlayerSystem)?.controlEntity(entity, entities);
  }

  movePlayer(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entities: EntityCollection
  ): void {
    this.systems.get(PlayerSystem)?.movePlayer(direction, entities);
  }

  moveEntity(
    direction: PropertyOf<PrimitiveMoveable, 'direction'>,
    entity: Entity,
    entities: EntityCollection
  ): void {
    this.systems
      .get(PrimitiveMovementSystem)
      ?.moveEntity(direction, entity, entities);
  }
}
