import {EntityCollection} from './EntityCollection';

export interface CoreUpdateCommand {
  update?(entities: EntityCollection): void;
}
