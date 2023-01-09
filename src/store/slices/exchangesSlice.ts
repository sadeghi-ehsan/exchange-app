/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExchangeMicroService from "@/apiServices/exchangeMicroservice";
import ExchangeEndPoints from "@/constants/apiEndpoints/exchangeMicroservice";
import { store } from "@/store";
import { IExchange } from "@/pages/converter/types";

interface IState {
  data?: IExchange[];
}

const initialState: IState = {
  data: undefined
};

export const slice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setChange: (state, action: PayloadAction<IExchange[]>) => {
      state.data = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setChange } = slice.actions;
export default slice.reducer;

export const getExchanges = async () => {
  try {
    const { data } = await ExchangeMicroService.get(ExchangeEndPoints.GET_EXCHANGES_API);
    store.dispatch(setChange(data));
  } catch (e) {
    console.log("error", e);
  }
};
