import React, { FC } from "react";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { getEndDay, getStartDay, shopSlice } from "../../slice";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export const DatePicker: FC = () => {
  const startDay = useSelector(getStartDay);
  const endDay = useSelector(getEndDay);

  const dispatch = useAppDispatch();
  const handleStartDayChange = date =>
    dispatch(shopSlice.actions.setStartDay(date.toDate().getTime()));

  const handleEndDayChange = date =>
    dispatch(shopSlice.actions.setEndDay(date.toDate().getTime()));

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        variant="inline"
        margin="normal"
        label="First day"
        value={startDay}
        onChange={handleStartDayChange}
        KeyboardButtonProps={{
          "aria-label": "change start date"
        }}
      />
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        variant="inline"
        margin="normal"
        label="Last day"
        value={endDay}
        onChange={handleEndDayChange}
        KeyboardButtonProps={{
          "aria-label": "change end date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
