export interface IPopulate {
    path: string;
    model?: string;
    populate?: string;
}

export type ISelect<Type> =
    | {
          [Property in keyof Type]?: 0 | 1;
      }
    | {};
