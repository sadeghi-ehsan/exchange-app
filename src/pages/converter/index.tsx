import React, { useEffect } from "react";
import Image from "next/image";
import { getExchanges } from "@/store/slices/exchangesSlice";
import { FormElementWrapper } from "../../components/Atoms/FormElementWrapper";
import { useAppSelector } from "@/hooks/redux";
import { SelectOption } from "@/components/Atoms/SelectOption";

const Converter: React.FC = () => {
  const exchangeRedux = useAppSelector(state => state);

  useEffect(() => {
    getExchanges();
  }, []);

  useEffect(() => {
    console.log("exchangeRedux", exchangeRedux);
  }, [exchangeRedux]);
  return (
    <div className="px-24 py-9">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">I want to convert</h1>
      <div className="flex space-x-8 items-end justify-between ">
        <FormElementWrapper label="amount" className="w-1/5">
          <input name="amount" className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full " />
        </FormElementWrapper>
        <FormElementWrapper label="from" className="w-2/5">
          <SelectOption
            options={exchangeRedux.exchangeSlice.data?.rates}
            className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full"
          />
        </FormElementWrapper>
        <div className="bg-white p-2 text-primary cursor-pointer shadow-md ">
          <Image src="/icons/compare_arrows.svg" width={24} height={24} alt="compare" />
        </div>
        <FormElementWrapper label="to" className="w-2/5">
          <SelectOption
            options={exchangeRedux.exchangeSlice.data?.rates}
            className="mt-5 py-2 outline-none  border-b-2 bg-card border-b-table-header w-full"
          />
        </FormElementWrapper>
        <a className="bg-primary px-3 py-2 text-white rounded-sm shadow-md cursor-pointer">CONVERT</a>
      </div>
    </div>
  );
};
export default Converter;
