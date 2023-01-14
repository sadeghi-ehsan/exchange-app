import React, { useEffect, useRef, useState } from "react";
import { convertRates, getExchangeRateHistory, getExchanges } from "@/store/slices/exchangesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { today, xDaysAgo } from "@/utils";
import { IInitState, IRates } from "./types";
import { Charts } from "@/pages/converter/Charts/Charts";
import { usePrevious } from "@/hooks/usePrevious";
import Filters from "@/pages/converter/Filters";
import Result from "@/pages/converter/Result";
import Tables from "@/pages/converter/Tables/Tables";
import { useRouter } from "next/router";

const Converter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [statsView, setStatsView] = useState("table");
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [state, setState] = useState<IInitState>({ from: "", to: "", amount: 1, duration: 7 });
  const [queryState, setQueryState] = useState<IInitState>({});
  const selectFrom = useRef();
  const selectTo = useRef();

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
    dispatch(getExchanges());
  }, []);

  /** if query from history page trigger start */
  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      const queryState = { ...state, ...router.query };
      setQueryState(queryState);
    }
  }, [router.query]);
  useEffect(() => {
    if (Object.keys(queryState).length !== 0) {
      dispatch(convertRates(queryState));
      dispatch(
        getExchangeRateHistory({ start_date: xDaysAgo(queryState.duration), end_date: today(), base: queryState.from })
      );
    }
  }, [queryState]);
  /** if query from history page trigger end */

  useEffect(() => {
    const { latestRate } = exchangeRedux;
    if (latestRate) {
      /** init state for from and to on component mount */
      if (!state.from && !state.to) {
        const clonedState = { ...state }; // creating copy of state variable
        clonedState.from = Object.keys(latestRate?.rates)[0];
        clonedState.to = Object.keys(latestRate?.rates)[0];
        setState(clonedState);
      }
    }
  }, [exchangeRedux]);

  useEffect(() => {
    const { resultRate } = exchangeRedux;
    if (resultRate) {
      setResultRateState(resultRate);
    }
  }, [exchangeRedux]);

  /** checks prevState of duration with current if changed .... start */
  const prevState = usePrevious({ state });
  useEffect(() => {
    if (prevState?.state.duration) {
      if (prevState?.state.duration !== state.duration) {
        convertRateExchange();
      }
    }
  }, [state]);
  /** checks prevState of duration with current if changed .... end */

  const handleChange = (value: string, name: string) => {
    const val = value.indexOf(",") > -1 ? value.split(",")[1] : value;
    setState(prevState => ({ ...prevState, [name]: val }));
  };

  const convertRateExchange = () => {
    dispatch(convertRates(state));
    dispatch(getExchangeRateHistory({ start_date: xDaysAgo(state.duration), end_date: today(), base: state.from }));
  };

  /** swap state and select change value start */
  const swapExchange = () => {
    /** change select option value */
    let temp = selectFrom.current?.value;
    selectFrom.current.value = selectTo.current?.value;
    selectTo.current.value = temp;
    /** swap state value */
    let newObj = { ...state };
    newObj.from = state.to;
    newObj.to = state.from;
    setState(newObj);
  };
  /** swap state and select change value end */

  const { latestRate } = exchangeRedux;
  return (
    <div className="px-24 py-9 h-full">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">I want to convert</h1>
      <Filters
        handleChange={handleChange}
        currentState={state}
        swapExchange={swapExchange}
        latestRate={latestRate}
        convertRateExchange={convertRateExchange}
        selectFrom={selectFrom}
        selectTo={selectTo}
      />
      <Result
        resultRate={resultRateState}
        currentState={state}
        handleChange={handleChange}
        onChangeView={(e: string) => setStatsView(e.target.value)}
      />
      {statsView === "table" ? <Tables currentState={state} /> : <Charts />}
    </div>
  );
};
export default Converter;
