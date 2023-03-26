import {EnqueueEntityTaskCommand} from '../commands';
import {System} from '../../ecs/System';
import {EntityCollection} from '../../ecs/EntityCollection';
import {QueueBased} from '../components';
import {CoreUpdateCommand} from '../../ecs/coreCommands';
import {ComponentCollection} from '../../ecs/ComponentCollection';

export class QueueSystem
  extends System
  implements CoreUpdateCommand, EnqueueEntityTaskCommand
{
  update(entities: EntityCollection): void {
    entities.forEach(this._dequeueEntityTask);
  }

  enqueueEntityTask(
    task: () => void,
    entity: number,
    entities: EntityCollection
  ): void {
    const components = entities.get(entity);
    if (components && components.has(QueueBased)) {
      const queueBased = components.get(QueueBased);
      const queueData = queueBased?.data;

      if (queueData) {
        components?.set(
          QueueBased,
          new QueueBased({
            queue: {
              ...queueData.queue,
              [queueData.tail]: task,
            },
            head: queueData.head,
            tail: queueData.tail + 1,
          })
        );
      }
    }
  }

  private _dequeueEntityTask(
    components: ComponentCollection | undefined
  ): void {
    if (components && components.has(QueueBased)) {
      const queueBased = components.get(QueueBased);
      const queueData = queueBased?.data;
      console.log(queueData);

      if (queueData) {
        const size = queueData.tail - queueData.head;

        if (size === 0) return;

        const queue = {
          ...queueData.queue,
        };

        queue[queueData.head]?.();

        delete queue[queueData.head];

        components?.set(
          QueueBased,
          new QueueBased({
            queue,
            head: queueData.head + 1,
            tail: queueData.tail,
          })
        );
      }
    }
  }
}
