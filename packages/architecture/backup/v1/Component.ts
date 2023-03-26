export const componentFactory = <T extends {} = {}>(
  symbol?: symbol | string
): IComponentWithSymbol<T> =>
  class extends Component<T> {
    static readonly symbol =
      typeof symbol === 'symbol' ? symbol : Symbol(symbol);
  };

export interface IComponentWithSymbol<T extends {} = any> {
  readonly symbol: symbol;
  new (data: T): Component<T>;
}

export interface ComponentCollection {
  [key: symbol]: Component | undefined;
}

export abstract class Component<T extends {} = {}> {
  constructor(public data: T) {}
}
