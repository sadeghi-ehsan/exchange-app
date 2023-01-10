/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExchangeMicroService from "@/apiServices/exchangeMicroservice";
import ExchangeEndPoints from "@/constants/apiEndpoints/exchangeMicroservice";
import { store } from "@/store";
import { IExchange, IRates, Query } from "@/pages/converter/types";

interface IState {
  latestRate?: IExchange[];
  resultRate?: IRates[];
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
    }
  }
});

// Action creators are generated for each case reducer function
export const { setChange, setConvertRate } = slice.actions;
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
  } catch (e) {
    console.log("error", e);
  }
};
