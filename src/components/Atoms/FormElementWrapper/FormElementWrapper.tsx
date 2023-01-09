import { classJoin } from "@/utils";
import { forwardRef } from "react";
import { IFormElWrapperProps } from "./types";

export const FormElementWrapper = forwardRef<HTMLDivElement, IFormElWrapperProps>(
  ({ label, children, className, labelClassName, ...restProps }, ref) => {
    return (
      <div {...restProps} ref={ref} className={classJoin([className])}>
        <fieldset className="select-none">
          <label htmlFor="amount" className={classJoin(["absolute select-none", labelClassName])}>
            {label}
          </label>
          {children}
        </fieldset>
      </div>
    );
  }
);
export default FormElementWrapper;
