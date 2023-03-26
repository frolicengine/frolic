/**
 * Represents time and state. Used to pass time values to behavior tree nodes.
 */
export default class StateData<T = unknown> {
  public constructor(
    public readonly state: T,
    public readonly deltaTime: number
  ) {}
}
