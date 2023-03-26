import {CoreUpdateCommand} from './coreCommands';
import {EntityCollection} from './EntityCollection';

export interface SystemConstructor {
  new (...args: any): System;
}

export abstract class System implements CoreUpdateCommand {
  update(entities: EntityCollection, deltaTime: number): void {
    if (!entities) {
      throw new Error('entities is a mandatory parameter');
    }
  }
}
