import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/RootState";

export type ShopSlice = typeof initialState;

const initialState = {
  isListOpen: false
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setListOpen: (state, action: PayloadAction<boolean>) => {
      state.isListOpen = action.payload;
    }
  }
});

export const getIsListOpen = (state: RootState) => state.shop.isListOpen;
