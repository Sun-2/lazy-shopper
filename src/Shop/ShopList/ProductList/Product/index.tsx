import React, { memo } from "react";
import { FC } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useDrag } from "react-dnd";
import { MARKER_DRAG_TYPE } from "../../../ShopMap/Marker";
import { shopMapPath } from "../../../ShopMap/routing";
import { useHistory } from "react-router-dom";
import PinDropIcon from "@material-ui/icons/PinDrop";

export type ProductProps = {
  name: string;
  amount: number;
};

export const Product: FC<ProductProps> = memo(({ amount, name, ...rest }) => {
  const { push } = useHistory();
  const [{ isDragging }, ref] = useDrag({
    item: { type: MARKER_DRAG_TYPE, name, amount },
    collect: m => ({
      isDragging: m.isDragging()
    }),
    begin: () => {
      push(shopMapPath);
    }
  });

  return (
    <ListItem {...rest}>
      <ListItemIcon ref={ref}>
        <PinDropIcon />
      </ListItemIcon>
      <ListItemText>
        {amount} {name} g
      </ListItemText>
    </ListItem>
  );
});
