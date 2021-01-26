import React, { FC, useEffect, useRef, useState } from "react";
import { MyMap } from "./MyMap";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { List } from "./List";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { Sidebar } from "./Sidebar";

const variants = {
  exit: {
    opacity: 0,
    position: "absolute" as const
  },
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};

const C1 = () => (
  <motion.div
    exit="exit"
    initial="hidden"
    animate="visible"
    variants={variants}
  >
    <MyMap />
  </motion.div>
);

const C2 = () => (
  <motion.div
    exit="exit"
    initial="hidden"
    animate="visible"
    variants={variants}
  >
    <List />
  </motion.div>
);

const PotatoRoot = styled.div`
  background-color: darkred;
  padding: 8px;
`;

const Product: FC = () => {
  const [, ref] = useDrag({
    item: { type: "product", name: "potato" }
  });

  return (
    <img
      height="32px"
      width="32px"
      ref={ref}
      src="https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32356-tomato-icon.png"
    />
  );
};

const Products: FC = () => {
  return (
    <>
      <Product />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Route
        render={({ location }) => (
          <>
            <Link to={location.pathname.includes("list") ? "/map" : "/list"}>
              Go
            </Link>
            <Products />
            <AnimatePresence initial={true}>
              <Switch location={location} key={location.pathname}>
                <Route path={"/map"} component={C1} />
                <Route path={"/list"} component={C2} />
                <Redirect to={"/map"} />
              </Switch>
            </AnimatePresence>
          </>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
