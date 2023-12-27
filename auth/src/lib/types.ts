export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S;

export type SnakeObjectToCamelCase<T> = T extends object
    ? {
          [K in keyof T as SnakeToCamelCase<K & string>]: SnakeObjectToCamelCase<T[K]>;
      }
    : T;

export type Override<Source, New> = Omit<Source, keyof New> & New;
