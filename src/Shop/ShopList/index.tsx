import React, { FC } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Root } from "./styles";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";
import { shopMapPath } from "../ShopMap/routing";

export interface ShopListProps {
  focused: boolean;
}

export const ShopList: FC<ShopListProps> = ({ focused }) => {
  const history = useHistory();

  const [{ isDragging }, ref] = useDrag({
    item: { type: "product", name: "potato" },
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
        <ListItem>
          <ListItemText>Pomidoro</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Tomejtou</ListItemText>
        </ListItem>
        <ListItem button ref={ref}>
          <img
            height="32px"
            width="32px"
            src="https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32356-tomato-icon.png"
          />
          <ListItemText>Pomidorro</ListItemText>
        </ListItem>
      </List>
    </Root>
  );
};
