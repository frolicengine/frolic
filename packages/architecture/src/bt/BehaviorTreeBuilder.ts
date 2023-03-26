import Stack from './Stack';
import BehaviorTreeStatus from './BehaviorTreeStatus';
import BehaviorTreeError from './Error/BehaviorTreeError';
import Errors from './Error/Errors';
import ActionNode from './Node/ActionNode';
import BehaviorTreeNodeInterface from './Node/BehaviorTreeNodeInterface';
import InverterNode from './Node/InverterNode';
import ParallelNode from './Node/ParallelNode';
import ParentBehaviorTreeNodeInterface from './Node/ParentBehaviorTreeNodeInterface';
import SelectorNode from './Node/SelectorNode';
import SequenceNode from './Node/SequenceNode';
import StateData from './StateData';

export default class BehaviorTreeBuilder<T = unknown> {
  /**
   * Last node created
   */
  private curNode?: BehaviorTreeNodeInterface<T>;

  /**
   * Stack node nodes that we are build via the fluent API.
   */
  private parentNodeStack: Stack<ParentBehaviorTreeNodeInterface<T>> =
    new Stack<ParentBehaviorTreeNodeInterface<T>>();

  /**
   * Create an action node.
   */
  public do(
    name: string,
    fn: (state: StateData<T>) => Promise<BehaviorTreeStatus>
  ): BehaviorTreeBuilder<T> {
    const peek = this.parentNodeStack.peek();

    if (!peek) {
      throw new BehaviorTreeError(Errors.UNNESTED_ACTION_NODE);
    }

    const actionNode = new ActionNode<T>(name, fn);
    peek.addChild(actionNode);

    return this;
  }

  /**
   * Like an action node... but the function can return true/false and is mapped to success/failure.
   */
  public condition(
    name: string,
    fn: (state: StateData<T>) => Promise<boolean>
  ): BehaviorTreeBuilder<T> {
    return this.do(name, async t =>
      (await fn(t)) ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure
    );
  }

  /**
   * Create an inverter node that inverts the success/failure of its children.
   *
   * @param {string} name
   * @returns {BehaviorTreeBuilder}
   */
  public inverter(name: string): BehaviorTreeBuilder<T> {
    return this.addParentNode(new InverterNode(name));
  }

  /**
   * Create a sequence node.
   */
  public sequence(name: string, keepState = true): BehaviorTreeBuilder<T> {
    return this.addParentNode(new SequenceNode(name, keepState));
  }

  /**
   * Create a parallel node.
   */
  public parallel(
    name: string,
    requiredToFail: number,
    requiredToSucceed: number
  ): BehaviorTreeBuilder<T> {
    return this.addParentNode(
      new ParallelNode(name, requiredToFail, requiredToSucceed)
    );
  }

  /**
   * Create a selector node.
   */
  public selector(name: string, keepState = true): BehaviorTreeBuilder<T> {
    return this.addParentNode(new SelectorNode(name, keepState));
  }

  /**
   * Splice a sub tree into the parent tree.
   */
  public splice(subTree: BehaviorTreeNodeInterface<T>): BehaviorTreeBuilder<T> {
    const peek = this.parentNodeStack.peek();

    if (!peek) {
      throw new BehaviorTreeError(Errors.SPLICE_UNNESTED_TREE);
    }

    peek.addChild(subTree);

    return this;
  }

  /**
   * Build the actual tree
   */
  public build(): BehaviorTreeNodeInterface<T> {
    if (!this.curNode) {
      this.end();
    }

    if (!this.curNode) {
      throw new BehaviorTreeError(Errors.NO_NODES);
    }

    return this.curNode;
  }

  /**
   * Ends a sequence of children.
   */
  public end(): BehaviorTreeBuilder<T> {
    this.curNode = this.parentNodeStack.pop();

    return this;
  }

  /**
   * Adds the parent node to the parentNodeStack
   */
  private addParentNode(
    node: ParentBehaviorTreeNodeInterface<T>
  ): BehaviorTreeBuilder<T> {
    const peek = this.parentNodeStack.peek();

    if (peek) {
      peek.addChild(node);
    }

    this.parentNodeStack.push(node);

    return this;
  }
}
