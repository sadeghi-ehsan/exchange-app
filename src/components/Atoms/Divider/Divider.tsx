import { FunctionComponent } from "react";
import { IDividerProps } from "./types";
import { classJoin } from "@/utils";

const Divider: FunctionComponent<IDividerProps> = ({ isVertical, className, ...otherProps }) => (
  <div
    className={classJoin([
      isVertical ? "w-0 border-0 border-r" : "h-0 border-0 border-b",
      "border border-solid border-idle-border",
      className
    ])}
    {...otherProps}
  />
);

Divider.defaultProps = { className: "", isVertical: false };

export default Divider;
