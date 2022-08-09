import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CoinList } from "../config/api";

import { useEffect } from "react";
const initialState = {
  currency: "USD",
  symbol: "$",
  coins: [],
  isLoading: false,
  user: null,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  watchlist: [],
};

export const getAllCoins = createAsyncThunk(
  "crypto/getAllCoins",
  async (_, thunkAPI) => {
    const { currency } = thunkAPI.getState().crypto;
    try {
      const { data } = await axios.get(CoinList(currency), {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    handleChangeCurrency: (state, { payload }) => {
      state.currency = payload;
      if (payload === "USD") {
        state.symbol = "$";
      } else {
        state.symbol = "THB";
      }
    },
    handleAlert: (state, { payload }) => {
      console.log(payload);
      const { open, message, type } = payload;
      state.alert.open = open;
      state.alert.message = message;
      state.alert.type = type;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setWatchlist: (state, { payload }) => {
      state.watchlist = payload;
    },
  },
  extraReducers: {
    [getAllCoins.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCoins.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.coins = [...payload];
    },
    [getAllCoins.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const {
  handleChangeCurrency,
  setSymbols,
  handleAlert,
  setUser,
  setWatchlist,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
