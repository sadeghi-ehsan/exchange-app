import React, { useEffect, useState } from "react";
import Image from "next/image";
import { convertRates, getExchangeRateHistory, getExchanges } from "@/store/slices/exchangesSlice";
import { FormElementWrapper } from "../../components/Atoms/FormElementWrapper";
import { useAppSelector } from "@/hooks/redux";
import { SelectOption } from "@/components/Atoms/SelectOption";
import { commaSeparator, today, xDaysAgo } from "@/utils";
import { Divider } from "@/components/Atoms/Divider";
import { Duration, IRates } from "./types";
import { Tables } from "./Tables/Tables";
import { Charts } from "./Charts/Charts";

const Converter: React.FC = () => {
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [state, setState] = useState({ from: "", to: "", amount: 1, duration: 7 });
  const [statsView, setStatsView] = useState("table");
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
    getExchanges();
  }, []);

  useEffect(() => {
    const { latestRate } = exchangeRedux;
    if (latestRate) {
      /** init state from and to */
      if (!state.from && !state.to) {
        const clonedState = { ...state }; // creating copy of state variable
        clonedState.from = Object.keys(latestRate?.rates)[0];
        clonedState.to = Object.keys(latestRate?.rates)[0];
        setState(clonedState);
      }
    }
  }, [exchangeRedux]);

  const convertRateExchange = () => {
    convertRates(state);
    getExchangeRateHistory({ start_date: xDaysAgo(state.duration), end_date: today(), base: state.from });
  };
  useEffect(() => {
    const { resultRate } = exchangeRedux;
    if (resultRate) {
      setResultRateState(resultRate);
    }
  }, [exchangeRedux]);

  useEffect(() => {
    console.log("state", state);
    if (state.duration) {
      getExchangeRateHistory({ start_date: xDaysAgo(state.duration), end_date: today(), base: state.from });
    }
  }, [state]);

  const swapExchange = () => {
    let newObj = { ...state };
    newObj.from = state.to;
    newObj.to = state.from;
    setState(newObj);
  };

  const handleChange = (value: string, name: string) => {
    const val = value.indexOf(",") > -1 ? value.split(",")[1] : value;
    setState(prevState => ({ ...prevState, [name]: val }));
  };

  const { latestRate } = exchangeRedux;
  return (
    <div className="px-24 py-9 h-full">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">I want to convert</h1>
      <div className="flex space-x-8 items-end justify-between ">
        <FormElementWrapper label="amount" className="w-1/5">
          <input
            defaultValue={state.amount}
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

      {resultRateState.success && (
        <>
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
                    onChange={e => setStatsView(e.target.value === "table" ? "table" : "chart")}
                  />
                  <span>Table</span>
                </label>
                <label className="space-x-2">
                  <input
                    type="radio"
                    value="chart"
                    name="group1"
                    className="accent-primary"
                    onChange={e => setStatsView(e.target.value === "table" ? "table" : "chart")}
                  />
                  <span>Chart</span>
                </label>
              </fieldset>
            </div>
            {statsView === "table" ? <Tables currentState={state} /> : <Charts />}
          </div>
        </>
      )}
    </div>
  );
};
export default Converter;
