import React, { forwardRef } from "react";
import { FormElementWrapper } from "@/components/Atoms/FormElementWrapper";
import { SelectOption } from "@/components/Atoms/SelectOption";
import Image from "next/image";
import { IFilters } from "@/pages/converter/Filters/types";

// @ts-ignore
const Filters: React.FC = forwardRef<HTMLDivElement, IFilters>(
  ({ handleChange, currentState, swapExchange, latestRate, convertRateExchange }) => {
    return (
      <div className="flex space-x-8 items-end justify-between ">
        <FormElementWrapper label="amount" className="w-1/5">
          <input
            defaultValue={currentState.amount}
            name="amount"
            className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full "
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(event.target.value, event.target.name)
            }
          />
        </FormElementWrapper>
        <FormElementWrapper label="from" className="w-2/5">
          <SelectOption
            options={latestRate?.rates}
            onChange={handleChange}
            name="from"
            className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full"
          />
        </FormElementWrapper>
        <div className="bg-white p-2 text-primary cursor-pointer shadow-md " onClick={swapExchange}>
          <Image src="/icons/compare_arrows.svg" width={24} height={24} alt="compare" />
        </div>
        <FormElementWrapper label="to" className="w-2/5">
          <SelectOption
            options={latestRate?.rates}
            onChange={handleChange}
            name="to"
            className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full"
          />
        </FormElementWrapper>
        <a
          className="bg-primary px-3 py-2 text-white rounded-sm shadow-md cursor-pointer"
          onClick={convertRateExchange}
        >
          CONVERT
        </a>
      </div>
    );
  }
);
export default Filters;
