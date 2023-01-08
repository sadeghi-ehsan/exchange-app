import { ForwardRefExoticComponent, RefAttributes, CSSProperties, ReactNode } from "react";
import type { AppProps } from "next/app";

export interface StandardProps {
  /** Unique id of element */
  id?: string;

  /** Additional classes */
  className?: string;

  /** Additional style */
  style?: CSSProperties;

  /** children props passes by react */
  children?: ReactNode | undefined;
}

export interface AnyProps {
  [x: string]: any;
}
export type IAppProps = AppProps & {
  Component: any;
};

export interface CompoundedComponent<ComponentProps>
  extends ForwardRefExoticComponent<ComponentProps & RefAttributes<HTMLElement>> {}
