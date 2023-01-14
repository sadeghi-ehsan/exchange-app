import { classJoin } from "@/utils";
import React, { forwardRef } from "react";
import { ISelectOptionProps } from "./types";

export const SelectOption = forwardRef<HTMLDivElement, ISelectOptionProps>(
  ({ className, options, onChange, name, ...restProps }, ref) => {
    return (
      <div {...restProps} className={classJoin(["text-default-text ", className])}>
        <select
          ref={ref}
          name={name}
          onChange={e => onChange(e.target.value, name)}
          className="w-full bg-transparent focus-visible:outline-0  cursor-pointer"
        >
          {options &&
            Object.keys(options).map((item, idx) => {
              return (
                // @ts-ignore
                <option value={options[item] + "," + item} key={idx}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
);
export default SelectOption;
