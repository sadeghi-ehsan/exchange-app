import React, { useEffect } from "react";
import { getExchanges } from "@/store/slices/exchangesSlice";
import { FormElementWrapper } from "../../components/Atoms/FormElementWrapper";
import { useAppSelector } from "@/hooks/redux";

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
      <FormElementWrapper label="amount">
        <input name="amount" className="mt-5 outline-none  border-b-2 bg-card border-b-default-text" />
      </FormElementWrapper>
    </div>
  );
};
export default Converter;
