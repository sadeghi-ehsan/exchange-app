import React, { useEffect, useState } from "react";
import Image from "next/image";
import { convertRates, getExchanges } from "@/store/slices/exchangesSlice";
import { FormElementWrapper } from "../../components/Atoms/FormElementWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { SelectOption } from "@/components/Atoms/SelectOption";
import { commaSeparator } from "@/utils";
import { Divider } from "@/components/Atoms/Divider";
import { Duration } from "./types";
import { Tables } from "./Tables/Tables";
import { Charts } from "./Charts/Charts";

const Converter: React.FC = () => {
  const exchangeRedux = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({ from: "", to: "", amount: "" });
  const [statsView, setStatsView] = useState("table");

  useEffect(() => {
    getExchanges();
  }, []);

  const handleChange = (value: string, name: string) => {
    const val = value.indexOf(",") > -1 ? value.split(",")[1] : value;
    setState(prevState => ({ ...prevState, [name]: val }));
  };

  useEffect(() => {
    const { latestRate } = exchangeRedux.exchangeSlice;
    if (latestRate) {
      let copy = { ...state }; // creating copy of state variable jasper
      copy.from = Object.keys(latestRate?.rates)[0];
      copy.to = Object.keys(latestRate?.rates)[0];
      setState(copy);
    }
  }, [exchangeRedux]);

  const convertRateExchange = () => {
    dispatch(convertRates(state));
  };
  const swapExchange = () => {
    let newObj = { ...state };
    newObj.from = state.to;
    newObj.to = state.from;
    setState(newObj);
  };
  const switchStatsView = (e: string) => {
    setStatsView(e === "table" ? "table" : "chart");
  };

  const { resultRate, latestRate } = exchangeRedux.exchangeSlice;
  return (
    <div className="px-24 py-9">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">I want to convert</h1>
      <div className="flex space-x-8 items-end justify-between ">
        <FormElementWrapper label="amount" className="w-1/5">
          <input
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

      {resultRate && (
        <>
          <div className="flex flex-col justify-center items-center pt-20 select-none  text-default-text">
            <h1 className="font-sans text-5xl">
              {`${resultRate.query.amount}  ${resultRate.query.from}`} ={" "}
              <span className="text-accent font-bold">{`${commaSeparator(resultRate.result, 3, true)} ${
                resultRate.query.to
              }`}</span>
            </h1>
            <h2 className="pt-10">{`1 ${resultRate.query.from} = xx ${resultRate.query.to}`}</h2>
            <h2 className="">{`1 ${resultRate.query.to} = xx ${resultRate.query.from}`}</h2>
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
                    onChange={e => switchStatsView(e.target.value)}
                  />
                  <span>Table</span>
                </label>
                <label className="space-x-2">
                  <input
                    type="radio"
                    value="chart"
                    name="group1"
                    className="accent-primary"
                    onChange={e => switchStatsView(e.target.value)}
                  />
                  <span>Chart</span>
                </label>
              </fieldset>
            </div>
            {statsView === "table" ? <Tables /> : <Charts />}
          </div>
        </>
      )}
    </div>
  );
};
export default Converter;
