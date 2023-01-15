import React, { useEffect, useRef, useState } from "react";
import { convertRates, getExchangeRateHistory, getExchanges } from "@/store/slices/exchangesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { today, xDaysAgo } from "@/utils";
import { IExchange, IInitState, IRates } from "./types";
import { Charts } from "@/pages/converter/Charts/Charts";
import { usePrevious } from "@/hooks/usePrevious";
import Filters from "@/pages/converter/Filters";
import Result from "@/pages/converter/Result";
import Tables from "@/pages/converter/Tables/Tables";
import { useRouter } from "next/router";

const Converter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectTo = useRef();
  const selectFrom = useRef();
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [statsView, setStatsView] = useState("table");
  const [state, setState] = useState<IInitState>({ from: "", to: "", amount: 1, duration: 7 });
  const [queryState, setQueryState] = useState<IInitState>({ amount: 0, duration: 0, from: "", to: "" });
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
    const { query } = router;
    if (Object.keys(query).length !== 0) {
      const queryState = { ...state, ...query };
      setQueryState(queryState);
      setState(queryState);
    }
  }, [router.query]);
  useEffect(() => {
    if (queryState.from !== "") {
      dispatch(convertRates(queryState));
      dispatch(
        getExchangeRateHistory({ start_date: xDaysAgo(queryState.duration), end_date: today(), base: queryState.from })
      );
    }
  }, [queryState]);
  /** if query from history page trigger end */

  useEffect(() => {
    const { resultRate }: { resultRate: IRates } = exchangeRedux;
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
    const clonedState = { ...state };
    /** init state for FIRST TIME  */
    if (clonedState.from === "" && clonedState.to === "") {
      const { latestRate }: { latestRate: IExchange } = exchangeRedux;
      if (latestRate) {
        clonedState.from = Object.keys(latestRate?.rates)[0];
        clonedState.to = Object.keys(latestRate?.rates)[0];
      }
    }
    dispatch(convertRates(clonedState));
    dispatch(
      getExchangeRateHistory({ start_date: xDaysAgo(clonedState.duration), end_date: today(), base: clonedState.from })
    );
    setState(clonedState);
  };

  /** swap state and select change value start */
  const swapExchange = () => {
    /** change select option value */
    // @ts-ignore
    let temp = selectFrom.current?.value;
    // @ts-ignore
    selectFrom.current.value = selectTo.current?.value;
    // @ts-ignore
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
      {statsView === "table" ? <Tables currentState={state} /> : <Charts currentState={state} />}
    </div>
  );
};
export default Converter;
