import React, { FC } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Root } from "./styles";
import { useDrag } from "react-dnd";
import {useHistory, useRouteMatch} from "react-router-dom";
import { shopMapPath } from "../ShopMap/routing";
import { MARKER_DRAG_TYPE } from "../ShopMap/Marker";

export interface ShopListProps {
  focused: boolean;
}

export const ShopList: FC<ShopListProps> = ({ focused }) => {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  console.log(url, path);
  const [{ isDragging }, ref] = useDrag({
    item: { type: MARKER_DRAG_TYPE, name: "potato" },
    collect: m => ({
      isDragging: m.isDragging()
    }),
    begin: () => {
      history.push(shopMapPath);
    }
  });

  return (
    <Root state={focused ? "open" : "closed"}>
      <List>
        <ListItem button ref={ref}>
          <ListItemText>Pomidorro</ListItemText>
        </ListItem>
      </List>
    </Root>
  );
};
