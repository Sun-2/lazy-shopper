import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/RootState";
import { LatLngExpression } from "leaflet";

export type ShopSlice = {
  markers: {
    [shopName: string]: { [productName: string]: LatLngExpression };
  };
  currentMap: string;
};

const initialState: ShopSlice = {
  markers: {
    carrefour: {
      pomidor: [500, 500]
    }
  },
  currentMap: "carrefour"
};

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
    }
  }
});

export const getMarkersForCurrentMap = (state: RootState) =>
  state.shop.markers[state.shop.currentMap];
