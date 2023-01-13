import React, { forwardRef, useEffect, useState } from "react";
import { commaSeparator } from "@/utils";
import { Divider } from "@/components/Atoms/Divider";
import { FormElementWrapper } from "@/components/Atoms/FormElementWrapper";
import { SelectOption } from "@/components/Atoms/SelectOption";
import { Duration, IRates } from "@/pages/converter/types";
import { IResult } from "@/pages/converter/Result/types";

const Result: React.FC = forwardRef<HTMLDivElement, IResult>(({ handleChange, onChangeView, resultRate }) => {
  const [resultRateState, setResultRateState] = useState<IRates>({
    date: "",
    historical: false,
    info: { rate: "" },
    motd: { msg: "", url: "" },
    query: { from: "", to: "", amount: 1 },
    result: undefined,
    success: false
  });

  useEffect(() => {
    setResultRateState(resultRate);
  });
  const { success } = resultRateState;
  return (
    success && (
      <div>
        <div className="flex flex-col justify-center items-center pt-20 select-none  text-default-text">
          <h1 className="font-sans text-5xl">
            {`${resultRateState.query?.amount}  ${resultRateState.query?.from}`} ={" "}
            <span className="text-accent font-bold">{`${commaSeparator(resultRateState.result, 3, true)} ${
              resultRateState.query?.to
            }`}</span>
          </h1>
          <h2 className="pt-10">{`1 ${resultRateState.query?.from} = xx ${resultRateState.query?.to}`}</h2>
          <h2 className="">{`1 ${resultRateState.query?.to} = xx ${resultRateState.query?.from}`}</h2>
          <Divider className="w-full my-12 " />
        </div>
        <div className="flex flex-col text-default-text">
          <h1 className="flex font-sans font-bold text-2xl ">Exchange History</h1>
          <div className="flex items-end py-5 ">
            <FormElementWrapper label="Duration" className="w-1/6">
              <SelectOption
                options={Duration}
                onChange={handleChange}
                name="duration"
                className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full"
              />
            </FormElementWrapper>
            <fieldset id="group1" className="px-20 space-x-10">
              <label className="space-x-2">
                <input
                  type="radio"
                  value="table"
                  name="group1"
                  className="accent-primary"
                  defaultChecked
                  onChange={onChangeView}
                />
                <span>Table</span>
              </label>
              <label className="space-x-2">
                <input type="radio" value="chart" name="group1" className="accent-primary" onChange={onChangeView} />
                <span>Chart</span>
              </label>
            </fieldset>
          </div>
        </div>
      </div>
    )
  );
});
export default Result;
