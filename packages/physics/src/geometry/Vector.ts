import {
  atan2,
  axis,
  cross,
  dot,
  magnitudeSquared,
  rotate,
  sqrt,
  transform,
} from '@frolic/physics/utils/mathFns';
import {ISize, IVector} from './type';

export class Vector implements IVector {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number);
  constructor(v: IVector);
  constructor();
  constructor(x?: number | IVector, y?: number) {
    switch (typeof x) {
      case 'object':
        this._x = x.x;
        this._y = x.y;
        break;
      case 'number':
        this._x = x;
        this._y = y || 0;
        break;
      default:
        this._x = 0;
        this._y = 0;
        break;
    }
  }

  public get x() {
    return this._x;
  }

  protected set x(x: number) {
    this._x = x;
  }

  public get y() {
    return this._y;
  }

  protected set y(y: number) {
    this._y = y;
  }

  /**
   * Scaler Projection
   */
  scaler(vector: IVector) {
    this.setMagnitude(this.dot(vector));
  }

  /**
   * Limit max of vector
   */
  limitMax(limit: number) {
    if (this.getMagnitude() > limit) {
      this.setMagnitude(limit);
    }
  }

  /**
   * Limit min of vector
   */
  limitMin(limit: number) {
    if (this.getMagnitude() < limit) {
      this.setMagnitude(limit);
    }
  }

  /**
   * Get the distance between vector and an other vector
   */
  getDistance(vector: IVector): number {
    const clone = this.clone();
    clone.subtract(vector);
    return clone.getMagnitude();
  }

  /**
   * Get vector angle
   */
  getAngle() {
    return atan2(this.y, this.x);
  }

  /**
   * Set vector angle
   */
  setAngle(angle: number, mirror: boolean) {
    const radius = this.getMagnitude();
    const array = axis(angle, radius);

    if (mirror) {
      this.x = array[1];
      this.y = array[0];
    } else {
      this.x = array[0];
      this.y = array[1];
    }
  }

  /**
   * Set vector magnitude
   */
  setMagnitude(magnitude: number) {
    this.normalize();
    this.multiply(magnitude);
  }

  /**
   * Normalize vector, Magnitude of 1
   */
  normalize() {
    this.x *= 1 / this.getMagnitude();
    this.y *= 1 / this.getMagnitude();
  }

  /**
   * Get vector magnitude
   */
  getMagnitude(): number {
    return sqrt(this.getMagnitudeSquared());
  }

  /**
   * Get vector magnitude squared
   */
  getMagnitudeSquared() {
    return magnitudeSquared(this);
  }

  /**
   * Heading rotation
   */
  getHeading() {
    return -atan2(-this.y, this.x);
  }
  /**
   * Dot product
   */
  dot(vector: IVector): number {
    return dot(vector, this);
  }

  /**
   * Cross product
   */
  cross(vector: IVector): number {
    return cross(vector, this);
  }

  /**
   * Rotate vector
   */
  rotate(angle: number) {
    const axis = rotate(this.clone(), angle);

    this.x = axis.x;
    this.y = axis.y;
  }

  /**
   * Transform vector
   */
  transform(angle: number, origin: ISize) {
    const axis = transform(this, origin, angle);

    this.x = axis.x;
    this.y = axis.y;
  }

  /**
   * Set x and y values of vector
   */
  set({x, y}: IVector) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add an other vector to vector
   */
  add({x, y}: IVector) {
    this.x += x;
    this.y += y;
  }

  /**
   * Subtract vector
   */
  subtract({x, y}: IVector) {
    this.x -= x;
    this.y -= y;
  }

  /**
   * Multiply vector by a scalar
   */
  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }

  /**
   * Multiply vector by an other vector
   */
  multiplyVector({x, y}: IVector) {
    this.x *= x;
    this.y *= y;
  }

  /**
   * Divide vector by a scalar
   */
  divide(scalar: number) {
    this.x *= 1 / scalar;
    this.y *= 1 / scalar;
  }

  /**
   * Square vector
   */
  square() {
    this.x = this.x * this.x;
    this.y = this.y * this.y;
  }

  /**
   * isNaN fix
   */
  fix() {
    this.x = isNaN(this.x) ? 0 : this.x;
    this.y = isNaN(this.y) ? 0 : this.y;
  }

  /**
   * Clone vector
   */
  clone() {
    return new Vector(this);
  }
}
