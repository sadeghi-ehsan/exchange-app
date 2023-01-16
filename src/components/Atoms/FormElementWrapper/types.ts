import { ReactNode } from "react";
import { StandardProps } from "@/types/common";

export interface IFormElWrapperProps extends StandardProps {
  /** Title of the element to show in legend area */
  label?: string | ReactNode;

  /** Additional classes */
  classNameInner?: string;

  /** custom className set directly for label */
  labelClassName?: string;

  /** children props passes by react */
  children?: ReactNode | undefined;
}
