import BehaviorTreeStatus from '../BehaviorTreeStatus';
import StateData from '../StateData';

export default interface BehaviorTreeNodeInterface<T = unknown> {
  tick(state: StateData<T>): Promise<BehaviorTreeStatus>;
}
