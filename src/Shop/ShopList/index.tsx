import React, { FC } from "react";
import { Box } from "@material-ui/core";
import { Root } from "./styles";
import { useDrag } from "react-dnd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { shopMapPath } from "../ShopMap/routing";
import { MARKER_DRAG_TYPE } from "../ShopMap/Marker";
import { DatePicker } from "./DatePicker";
import { PlanPicker } from "./PlanPicker";
import { List } from "./ProductList";

export interface ShopListProps {
  focused: boolean;
}

export const ShopList: FC<ShopListProps> = ({ focused }) => {
  const history = useHistory();

  return (
    <Root state={focused ? "open" : "closed"}>
      <Box p={2} display="flex" flexDirection="column" height="100%">
        <List />
        <Box mt="auto">
          <DatePicker />
          <PlanPicker />
        </Box>
      </Box>
    </Root>
  );
};
