import {ComponentCollection} from './Component';

export type Entity = number;

export interface EntityCollection {
  [id: Entity]: ComponentCollection;
}
