/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExchangeMicroService from "@/apiServices/exchangeMicroservice";
import ExchangeEndPoints from "@/constants/apiEndpoints/exchangeMicroservice";
import { store } from "@/store";
import { IExchange, IRates, IRatesHistory, Query } from "@/pages/converter/types";

interface IState {
  latestRate?: IExchange[];
  resultRate?: IRates[];
  exchangeRateHistory?: IRatesHistory[];
}

const initialState: IState = {
  latestRate: undefined,
  resultRate: undefined
};

export const slice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setChange: (state, action: PayloadAction<IExchange[]>) => {
      state.latestRate = action.payload;
    },
    setConvertRate: (state, action: PayloadAction<IRates[]>) => {
      state.resultRate = action.payload;
    },
    setExchangeRateHistory: (state, action: PayloadAction<IRatesHistory[]>) => {
      state.exchangeRateHistory = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setChange, setConvertRate, setExchangeRateHistory } = slice.actions;
export default slice.reducer;

export const getExchanges = async () => {
  try {
    const { data } = await ExchangeMicroService.get(ExchangeEndPoints.GET_EXCHANGES_API);
    store.dispatch(setChange(data));
  } catch (e) {
    console.log("error", e);
  }
};

export const convertRates = async ({ from, to, amount }: Query) => {
  try {
    const { data } = await ExchangeMicroService.get(ExchangeEndPoints.GET_CONVERT_EXCHANGE({ from, to, amount }));
    store.dispatch(setConvertRate(data));

    let history: IRates[] = [];
    if (localStorage.getItem("history")) {
      let prevHistory = JSON.parse(localStorage.getItem("history") || "[]");
      history = [...prevHistory, data];
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      localStorage.setItem("history", JSON.stringify([data]));
    }
  } catch (e) {
    console.log("error", e);
  }
};

export const getExchangeRateHistory = async ({ start_date, end_date, base }: any) => {
  try {
    const { data } = await ExchangeMicroService.get(
      ExchangeEndPoints.GET_EXCHANGE_BY_DATE({ start_date, end_date, base })
    );
    store.dispatch(setExchangeRateHistory(data));
  } catch (e) {}
};
