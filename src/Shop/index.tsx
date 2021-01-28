import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Root } from "./styles";
import { ShopMap } from "./ShopMap";
import { ShopList } from "./ShopList";
import { Link, useHistory, useLocation } from "react-router-dom";
import { usePathSegments } from "../utils/usePathSegments";
import { shopMapPath } from "./ShopMap/routing";
import { shopListPath } from "./ShopList/routing";

export const Shop: FC = () => {
  const pathSegments = usePathSegments();

  const history = useHistory();
  const [tabSelected, setTabSelected] = useState(() => {
    const index = locations.findIndex(({ path }) => path === pathSegments[0]);
    return index === -1 ? 0 : index;
  });

  const onTabsChange = (_: any, newValue: number) => {
    setTabSelected(newValue);
    history.push(locations[newValue].path);
  };

  const firstSegment = pathSegments[0];
  useLayoutEffect(() => {
    setTabSelected(locations.findIndex(loc => loc.path === firstSegment));
  }, [firstSegment]);

  return (
    <Root>
      <Box position="relative" height="100%" width="100%">
        {locations.map(({ component: Component, path }, i) => (
          <Component key={path} focused={i === tabSelected} />
        ))}
      </Box>

      <AppBar position="static">
        <Tabs variant="fullWidth" value={tabSelected} onChange={onTabsChange}>
          {locations.map(({ label }) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </AppBar>
    </Root>
  );
};

const locations = Object.values({
  map: {
    component: ShopMap,
    path: shopMapPath,
    label: "Map"
  },
  list: {
    component: ShopList,
    path: shopListPath,
    label: "List"
  }
});
