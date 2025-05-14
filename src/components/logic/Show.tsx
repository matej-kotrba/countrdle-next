import { ReactNode } from "react";

type BaseProps = {
  fallback?: ReactNode;
};

type FunctionProps<T = unknown> = {
  when: T;
  children: ReactNode | ((value: NonNullable<T>) => ReactNode);
};

type Props<T> = BaseProps & FunctionProps<T>;

// const a: FunctionProps = { when: "", children: <div></div> };

export default function Show<T>({ when, children, fallback }: Props<T>) {
  return when
    ? typeof children === "function"
      ? children(when as NonNullable<T>)
      : children
    : fallback;
}
