import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Root } from "./styles";
import { ShopMap } from "./ShopMap";
import { ShopList } from "./ShopList";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { usePathSegments } from "../utils/usePathSegments";
import { shopMapPath } from "./ShopMap/routing";
import { shopListPath } from "./ShopList/routing";
import { CustomDragLayer } from "./CustomDragLayer";
import MapIcon from "@material-ui/icons/Map";
import ListAltIcon from "@material-ui/icons/ListAlt";

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

  //todo refactor tab logic into its own component
  const firstSegment = pathSegments[0];
  useLayoutEffect(() => {
    const tabIndex = locations.findIndex(loc => loc.path === firstSegment);
    setTabSelected(tabIndex === -1 ? 0 : tabIndex);
  }, [firstSegment]);

  const contentItems = (
    <Box position="relative" height="100%" width="100%">
      {locations.map(({ component: Component, path }, i) => (
        <Component key={path} focused={i === tabSelected} />
      ))}
    </Box>
  );

  const tabItems = (
    <AppBar position="static" color="transparent">
      <Tabs variant="fullWidth" value={tabSelected} onChange={onTabsChange}>
        {locations.map(({ path, icon }) => (
          <Tab key={path} icon={icon} />
        ))}
      </Tabs>
    </AppBar>
  );

  return (
    <Root>
      <CustomDragLayer />
      {contentItems}
      {tabItems}
    </Root>
  );
};

const locations = Object.values({
  /*  profile: {
    component: Profile,
    path: profilePath,
    icon: <AccountCircleIcon />
  },*/
  map: {
    component: ShopMap,
    path: shopMapPath,
    icon: <MapIcon />
  },
  list: {
    component: ShopList,
    path: shopListPath,
    icon: <ListAltIcon />
  }
});
