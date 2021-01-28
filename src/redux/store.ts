import { configureStore } from "@reduxjs/toolkit";
import { shopSlice } from "../Shop/slice";

export const store = configureStore({
  reducer: {
    [shopSlice.name]: shopSlice.reducer
    //[slice.name]: slice.reducer
  }
});
