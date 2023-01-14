import { IExchange, IInitState } from "@/pages/converter/types";
import { AnyProps } from "@/types/common";
import { ReactNode } from "react";

export interface IFilters {
  handleChange: () => void | AnyProps;
  currentState: IInitState;
  swapExchange: () => void;
  latestRate: IExchange;
  convertRateExchange: () => void;
  selectFrom: ReactNode;
  selectTo: ReactNode;
}
