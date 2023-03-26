import {EntityCollection} from './EntityCollection';

export interface CoreUpdateCommand {
  update?(entities: EntityCollection, deltaTime: number): void;
}
