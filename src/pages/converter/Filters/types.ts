import { IExchange, IInitState } from "@/pages/converter/types";
import { AnyProps } from "@/types/common";
import { ReactNode } from "react";

export interface IFilters {
  handleChange: (value: string, name: string) => any;
  currentState: IInitState;
  swapExchange: () => void;
  latestRate: IExchange;
  convertRateExchange: () => void;
  selectFrom: ReactNode | any;
  selectTo: ReactNode | any;
}
