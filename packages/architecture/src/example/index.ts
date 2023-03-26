import {CommandSystem} from './systems';
import {EntityCollection} from '../ecs/EntityCollection';
import {SearchAI} from './assemblages';
import {
  Name,
  Position,
  PrimitiveAppearance,
  PrimitiveMoveable,
} from './components';
import * as readline from 'readline';

//Entities
const entityCollection = new EntityCollection(
  [
    1,
    SearchAI(
      new Name({name: 'BOT'}),
      new Position({x: 0, y: 0}),
      new PrimitiveMoveable({direction: null}),
      new PrimitiveAppearance({character: 'A'})
    ),
  ],
  [
    2,
    SearchAI(
      new Name({name: 'BOT2'}),
      new Position({x: 1, y: 1}),
      new PrimitiveMoveable({direction: null}),
      new PrimitiveAppearance({character: 'B'})
    ),
  ]
);

const dispatcher = CommandSystem.getInstance();

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on('keypress', (c, k) => {
  switch (k.name) {
    case 'q':
      throw {QUIT: true};
  }
});

const frames = 160;
//setTimeout(main, frames);
function main() {
  const startTime = Date.now();
  dispatcher.update(entityCollection, startTime);
  setTimeout(main, startTime + frames - Date.now());
}

setTimeout(() => dispatcher.update(entityCollection, 0), 60);
setTimeout(() => dispatcher.update(entityCollection, 0), 120);
setTimeout(() => dispatcher.update(entityCollection, 0), 180);
setTimeout(() => dispatcher.update(entityCollection, 0), 240);
