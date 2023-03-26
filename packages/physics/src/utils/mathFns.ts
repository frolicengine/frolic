import {ISize, IVector} from '@frolic/physics/geometry/type';

export const transform = (
  {x, y}: IVector,
  {width, height}: ISize,
  angle: number
): IVector & ISize => {
  const rect: IVector & ISize = {x, y, width, height};
  let c = cos(angle);
  let s = sin(angle);
  let cPos = true;
  let sPos = true;

  if (s < 0) {
    s = -s;
    sPos = false;
  }

  if (c < 0) {
    c = -c;
    cPos = false;
  }

  rect.width = height * s + width * c;
  rect.height = height * c + width * s;

  if (cPos) {
    if (sPos) {
      rect.x -= height * s;
    } else {
      rect.y -= width * s;
    }
  } else if (sPos) {
    rect.x -= width * c - height * s;
    rect.y -= height * c;
  } else {
    rect.x -= width * c;
    rect.y -= width * s + height * c;
  }

  return rect;
};

export const map = (
  value: number,
  low: number,
  high: number,
  low2: number,
  high2: number
) => {
  const percent = (value - low) / (high - low);
  return low2 + percent * (high2 - low2);
};

export const rotate = ({x, y}: IVector, angle: number) => {
  x = x * cos(angle) - y * sin(angle);
  y = x * sin(angle) + y * cos(angle);

  return {x, y};
};

export const axis = (angle: number, radius: number) => [
  cos(angle) * radius,
  sin(angle) * radius,
];
export const magnitudeSquared = ({x, y}: IVector) => x * x + y * y;
export const dot = (v2: IVector, v1: IVector) => v1.x * v2.x + v1.y * v2.y;
export const cross = (v2: IVector, v1: IVector) => v1.x * v2.x - v1.y * v2.y;

export const floor = (float: number) =>
  float << 0 || ~~float || Math.floor(float);

export const constrain = (number: number, min: number, max: number) =>
  number > max ? max : number < min ? min : number;

export const clamp = (val: number, minVal: number, maxVal: number) =>
  max(minVal, min(maxVal, val));

export const PI = Math.PI;

export const sqrt = Math.sqrt;

export const sqrt2 = Math.SQRT2;

export const min = Math.min;

export const max = Math.max;

export const abs = Math.abs;

export const ceil = Math.ceil;

export const exp = Math.exp;

export const pow = Math.pow;

export const round = Math.round;

export const cos = Math.cos;

export const sin = Math.sin;

export const tan = Math.tan;

export const acos = Math.acos;

export const asin = Math.asin;

export const atan = Math.atan;

export const atan2 = Math.atan2;
