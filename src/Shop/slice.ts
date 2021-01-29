import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/RootState";
import { LatLngExpression } from "leaflet";
import moment, { Moment } from "moment";

const initialState = {
  markers: {
    carrefour: {
      pomidor: [500, 500]
    }
  } as { [shopName: string]: { [productName: string]: LatLngExpression } },
  currentMap: "carrefour",
  startDay: moment()
    .add(1, "days")
    .toDate()
    .getTime(),
  endDay: moment()
    .add(3, "days")
    .toDate()
    .getTime(),
  currentPlan: ""
};

export type ShopSlice = typeof initialState;

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addMarkerForCurrentMap: (
      state,
      action: PayloadAction<{ name: string; latLng: LatLngExpression }>
    ) => {
      state.markers[state.currentMap][action.payload.name] =
        action.payload.latLng;
    },
    removeMarkerForCurrentMap: (state, action: PayloadAction<string>) => {
      delete state.markers[state.currentMap][action.payload];
    },
    setStartDay: (state, action: PayloadAction<number>) => {
      state.startDay = action.payload;
    },
    setEndDay: (state, action: PayloadAction<number>) => {
      state.endDay = action.payload;
    },
    setCurrentPlan: (state, action: PayloadAction<string>) => {
      state.currentPlan = action.payload;
    }
  }
});

export const getMarkersForCurrentMap = (state: RootState) =>
  state.shop.markers[state.shop.currentMap];
export const getCurrentMap = (state: RootState) => state.shop.currentMap;

export const getStartDay = (state: RootState) => moment(state.shop.startDay);
export const getEndDay = (state: RootState) => moment(state.shop.endDay);

export const getCurrentPlan = (state: RootState) => state.shop.currentPlan;
