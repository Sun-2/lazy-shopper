import React, { FC } from "react";
import { Box } from "@material-ui/core";
import { Root } from "./styles";
import { DatePicker } from "./DatePicker";
import { PlanPicker } from "./PlanPicker";
import { List } from "./ProductList";

export interface ShopListProps {
  focused: boolean;
}

export const ShopList: FC<ShopListProps> = ({ focused }) => {
  return (
    <Root state={focused ? "open" : "closed"}>
      <Box display="flex" flexDirection="column" height="100%">
        <List />

        <Box p={2} mt="auto">
          <DatePicker />
          <PlanPicker />
        </Box>
      </Box>
    </Root>
  );
};
