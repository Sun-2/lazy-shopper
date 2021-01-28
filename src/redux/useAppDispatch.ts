import {useDispatch} from "react-redux";
import {AppDispatch} from "./AppDispatch";

export const useAppDispatch = () => useDispatch<AppDispatch>();