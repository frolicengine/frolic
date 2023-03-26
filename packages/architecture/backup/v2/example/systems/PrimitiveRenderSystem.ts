import {Position, PrimitiveAppearance, Controllable} from '../components';
import {EntityCollection} from '../../EntityCollection';
import {System} from '../../System';

type XAxis = 0 | 1 | 2 | 3;
type YAxis = 0 | 1;

export class PrimitiveRenderSystem extends System {
  update(entities: EntityCollection): void {
    entities.forEach(components => {
      if (
        components.has(PrimitiveAppearance) &&
        components.has(Position) &&
        components.has(Controllable)
      ) {
        const {x, y} = components.get(Position)?.data || {x: 0, y: 0};
        const {character} = components.get(PrimitiveAppearance)?.data || {
          character: 'A',
        };

        this.renderGrid(x as XAxis, y as YAxis, character);
      }
    });
  }

  private renderGrid(x: XAxis, y: YAxis, char: 'A' | 'B') {
    const r = (currX: XAxis, currY: YAxis) => {
      if (x === currX && y === currY) {
        return char;
      }

      return ' ';
    };
    process.stdout.moveCursor(0, -6);
    process.stdout.clearScreenDown();
    process.stdout.write(' \n');
    process.stdout.write('---------\n');
    process.stdout.write(`|${r(0, 0)}|${r(1, 0)}|${r(2, 0)}|${r(3, 0)}|\n`);
    process.stdout.write('---------\n');
    process.stdout.write(`|${r(0, 1)}|${r(1, 1)}|${r(2, 1)}|${r(3, 1)}|\n`);
    process.stdout.write('---------\n');
  }
}
