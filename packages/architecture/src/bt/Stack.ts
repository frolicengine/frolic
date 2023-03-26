export default class Stack<TData> {
  private _topNode: StackNode<TData> | undefined;
  private _count = 0;

  public count(): number {
    return this._count;
  }

  public isEmpty(): boolean {
    return typeof this._topNode === 'undefined';
  }

  public push(value: TData): void {
    // create a new Node and add it to the top
    const node = new StackNode<TData>(value, this._topNode);
    this._topNode = node;
    this._count++;
  }

  public pop(): TData | undefined {
    const poppedNode = this._topNode;

    this._topNode = poppedNode?.previous;
    this._count--;

    return poppedNode?.data;
  }

  public peek(): TData | undefined {
    return this._topNode?.data;
  }
}

class StackNode<T> {
  constructor(public data: T, public previous?: StackNode<T>) {
    this.previous = previous;
    this.data = data;
  }
}
