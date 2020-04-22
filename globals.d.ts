// fix sass modules import
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}


interface IDictionary<T> {
  readonly [key: string]: T | undefined;
}

const $: any;

type Sub0<
  O extends string,
  D extends string,
  > = {[K in O]: (Record<D, never> & Record<string, K>)[K]}

type Sub<
  O extends string,
  D extends string,
  // issue 16018
  Foo extends Sub0<O, D> = Sub0<O, D>
  > = Foo[O]

type Omit<
  O,
  D extends string,
  // issue 16018
  Foo extends Sub0<keyof O, D> = Sub0<keyof O, D>
  > = Pick<O, Foo[keyof O]>
