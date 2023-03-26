import {CommandSystem} from './systems';
import {EntityCollection} from '../EntityCollection';
import {Hero, Wall} from './assemblages';
import {
  Moveable,
  Name,
  Position,
  Controllable,
  PrimitiveAppearance,
  PrimitiveMoveable,
} from './components';
import * as readline from 'readline';
//Entities
const playerEntity = 0;
const wallEntity = 1;

const entityCollection = new EntityCollection([
  playerEntity,
  Hero(
    new Name({name: 'Rhobar III'}),
    new Position({x: 0, y: 0}),
    new PrimitiveMoveable({direction: null}),
    new PrimitiveAppearance({character: 'A'})
  ),
]);

entityCollection.set(
  wallEntity,
  Wall(new Position({x: 0, y: 0}), new PrimitiveAppearance({character: 'B'}))
);

const heroComponents = entityCollection.get(playerEntity);
const wallComponents = entityCollection.get(wallEntity);

if (!heroComponents || !wallComponents) {
  throw new Error();
}

const name = heroComponents.get(Name);
const position = heroComponents.get(Position);
const movement = heroComponents.get(Moveable);

console.log(name);
console.log(position);
console.log(movement);

try {
  heroComponents.set(Moveable, new Moveable({acceleration: 10, velocity: 15}));
} catch (e) {
  console.log((e as Error).message);
}

if (!heroComponents.has(Controllable)) {
  heroComponents.set(Controllable, new Controllable({}));
}

console.log(entityCollection);

const dispatcher = CommandSystem.getInstance();

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

dispatcher.update(entityCollection);

process.stdin.on('keypress', (c, k) => {
  switch (k.name) {
    case 'left':
      dispatcher.movePlayer('left', entityCollection);
      break;
    case 'right':
      dispatcher.movePlayer('right', entityCollection);
      break;
    case 'up':
      dispatcher.movePlayer('up', entityCollection);
      break;
    case 'down':
      dispatcher.movePlayer('down', entityCollection);
      break;
    case '1':
      dispatcher.controlEntity(playerEntity, entityCollection);
      break;
    case '2':
      dispatcher.controlEntity(wallEntity, entityCollection);
      break;
    case 'q':
      throw new Error('EXIT');
  }
  dispatcher.update(entityCollection);
  dispatcher.movePlayer(null, entityCollection);
});

setInterval(() => {}, 24);
