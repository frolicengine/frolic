import {QueueSystem} from './QueueSystem';
import {Entity} from '../../ecs/Entity';
import {EntityCollection} from '../../ecs/EntityCollection';
import {CoreCommandSystem} from '../../ecs/CoreCommandSystem';
import {
  ControlEntityCommand,
  EnqueueEntityTaskCommand,
  MoveEntityCommand,
  MovePlayerCommand,
} from '../commands';
import {PrimitiveMovementSystem} from './PrimitiveMovementSystem';
import {PlayerSystem} from './PlayerSystem';
import {PrimitiveRenderSystem} from './PrimitiveRenderSystem';
import {PrimitiveMoveable} from '../components';
import {PropertyOf} from '../../ecs/Component';
import {BehaviorSystem} from './BehaviorSystem';

export class CommandSystem
  extends CoreCommandSystem
  implements
    ControlEntityCommand,
    MoveEntityCommand,
    MovePlayerCommand,
    EnqueueEntityTaskCommand
{
  protected static instance: CommandSystem;

  constructor() {
    super(
      [PlayerSystem, new PlayerSystem()],
      [PrimitiveMovementSystem, new PrimitiveMovementSystem()],
      [PrimitiveRenderSystem, new PrimitiveRenderSystem()],
      [QueueSystem, new QueueSystem()],
      [BehaviorSystem, new BehaviorSystem()]
    );
  }

  static getInstance(): CommandSystem {
    if (!this.instance) {
      this.instance = new CommandSystem();
    }

    return this.instance;
  }

  update(entities: EntityCollection, deltaTime: number) {
    this.systems.get(BehaviorSystem)?.build(entities);
    this.systems.get(PlayerSystem)?.update(entities);
    this.systems.get(BehaviorSystem)?.update(entities, deltaTime);
    this.systems.get(QueueSystem)?.update(entities);
    this.systems.get(PrimitiveMovementSystem)?.update(entities);
    this.systems.get(PrimitiveRenderSystem)?.update(entities);
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
    this.enqueueEntityTask(
      () =>
        this.systems
          .get(PrimitiveMovementSystem)
          ?.moveEntity(direction, entity, entities),
      entity,
      entities
    );
  }

  enqueueEntityTask(
    task: () => void,
    entity: number,
    entities: EntityCollection
  ): void {
    this.systems.get(QueueSystem)?.enqueueEntityTask(task, entity, entities);
  }
}

export const commands = new CommandSystem();
