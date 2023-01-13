import { StandardProps } from "@/types/common";

export interface ISelectOptionProps extends StandardProps {
  /** Additional classes */
  className?: string;

  /** rates object */
  options: {};

  /** value returned on select*/
  onChange: (value: any, name: string) => void;

  /** name of select option */
  name: string;
}
