import { classJoin } from "@/utils";
import React, { forwardRef, useEffect, useState } from "react";
import { ISelectOptionProps } from "./types";

export const SelectOption = forwardRef<HTMLDivElement, ISelectOptionProps>(
  ({ className, options, ...restProps }, ref) => {
    const [selectedOption, setSelectedOption] = useState<String>();
    const [selOptions, setSelOptions] = useState<any>({});

    useEffect(() => {
      options != null && setSelOptions(options);
    }, [options]);

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedOption(value);
    };
    return (
      <div {...restProps} ref={ref} className={classJoin([className])}>
        <select onChange={selectChange} className="w-full bg-transparent focus-visible:outline-0">
          {options &&
            Object.keys(options).map((item, idx) => {
              return (
                // @ts-ignore
                <option value={options[item]} key={idx}>
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
