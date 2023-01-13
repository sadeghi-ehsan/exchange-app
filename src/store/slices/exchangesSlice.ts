/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExchangeMicroService from "@/apiServices/exchangeMicroservice";
import ExchangeEndPoints from "@/constants/apiEndpoints/exchangeMicroservice";
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

export const getExchanges = createAsyncThunk("getExchange", async () => {
  try {
    const { data } = await ExchangeMicroService.get(ExchangeEndPoints.GET_EXCHANGES_API);
    return data;
  } catch (e) {
    console.log("error", e);
  }
});

export const convertRates = createAsyncThunk("convertExchange", async ({ from, to, amount }: Query) => {
  try {
    const { data } = await ExchangeMicroService.get(ExchangeEndPoints.GET_CONVERT_EXCHANGE({ from, to, amount }));
    let history: IRates[] = [];
    if (localStorage.getItem("history")) {
      let prevHistory = JSON.parse(localStorage.getItem("history") || "[]");
      history = [...prevHistory, data];
      localStorage.setItem("history", JSON.stringify(history));
    } else {
      localStorage.setItem("history", JSON.stringify([data]));
    }
    return data;
  } catch (e) {
    console.log("error", e);
  }
});

export const getExchangeRateHistory = createAsyncThunk("historyRate", async ({ start_date, end_date, base }: any) => {
  try {
    const { data } = await ExchangeMicroService.get(
      ExchangeEndPoints.GET_EXCHANGE_BY_DATE({ start_date, end_date, base })
    );
    return data;
  } catch (e) {}
});

export const slice = createSlice({
  name: "exchange",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getExchanges.fulfilled, (state, action) => {
        state.latestRate = action.payload;
      })
      .addCase(convertRates.fulfilled, (state, action) => {
        state.resultRate = action.payload;
      })
      .addCase(getExchangeRateHistory.fulfilled, (state, action) => {
        state.exchangeRateHistory = action.payload;
      });
  }
});

// Action creators are generated for each case reducer function
export default slice.reducer;
