import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./features/cryptoSlice";
export const store = configureStore({
  reducer: {
    crypto: cryptoSlice,
  },
});
