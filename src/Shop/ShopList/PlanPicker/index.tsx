import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import React from "react";
import { FC } from "react";
import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { getCurrentPlan, shopSlice } from "../../slice";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export const PlanPicker: FC = () => {
  const currentPlan = useSelector(getCurrentPlan);

  const [user] = useAuthState(auth);
  const [data, loading, error]: any[] = useDocumentData<any>(
    !user ? null : firestore.collection("plans").doc(user.uid)
  );

  const planNames = data ? Object.keys(data) : null;

  const dispatch = useAppDispatch();
  const handleChange = e =>
    dispatch(shopSlice.actions.setCurrentPlan(e.target.value));

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="plan-select">Plan</InputLabel>
        <Select
          fullWidth
          labelId="plan-select"
          id="plan-select"
          value={currentPlan}
          onChange={handleChange}
          disabled={!data}
        >
          {planNames?.map(planName => (
            <MenuItem key={planName} value={planName}>
              {planName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
