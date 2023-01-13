import { IExchange, IInitState } from "@/pages/converter/types";
import { AnyProps } from "@/types/common";

export interface IFilters {
  handleChange: () => void | AnyProps;
  currentState: IInitState;
  swapExchange: () => void;
  latestRate: IExchange;
  convertRateExchange: () => void;
}
