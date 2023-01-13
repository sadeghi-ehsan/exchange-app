import { IRates } from "@/pages/converter/types";

export interface IResult {
  handleChange: () => void;
  onChangeView: () => void;
  resultRate: IRates;
}
