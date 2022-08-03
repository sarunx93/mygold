import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  currency: "USD",
  symbol: "$",
};
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
  },
});
export const { handleChangeCurrency, setSymbols } = cryptoSlice.actions;
export default cryptoSlice.reducer;
