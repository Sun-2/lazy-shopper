import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

declare module "react-redux" {
  export interface DefaultRootState extends RootState {}
}