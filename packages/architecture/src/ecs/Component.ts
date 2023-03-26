export type PropertyOf<
  T extends Component,
  P extends keyof DataOf<T>
> = DataOf<T>[P];

export type DataOf<T extends Component> = T['data'];

export interface ComponentConstructor<T extends {} = any> {
  new (data: T): Component;
}

export abstract class Component<T extends {} = {}> {
  constructor(public data: T) {}
}
