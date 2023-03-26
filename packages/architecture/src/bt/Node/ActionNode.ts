import BehaviorTreeStatus from '../BehaviorTreeStatus';
import BehaviorTreeError from '../Error/BehaviorTreeError';
import Errors from '../Error/Errors';
import StateData from '../StateData';
import BehaviorTreeNodeInterface from './BehaviorTreeNodeInterface';

/**
 * A behavior tree leaf node for running an action
 *
 * @property {string}                                   name - The name of the node
 * @property {(state: StateData) => BehaviorTreeStatus} fn   - Function to invoke for the action.
 */
export default class ActionNode<T = unknown>
  implements BehaviorTreeNodeInterface
{
  public constructor(
    public readonly name: string,
    public readonly fn: (state: StateData<T>) => Promise<BehaviorTreeStatus>
  ) {}

  public async tick(state: StateData<T>): Promise<BehaviorTreeStatus> {
    const result = await this.fn(state);
    if (!result) {
      throw new BehaviorTreeError(Errors.NO_RETURN_VALUE);
    }

    return result;
  }
}
