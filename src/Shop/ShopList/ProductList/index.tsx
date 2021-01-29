import React, { FC, Fragment, useCallback, useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../../firebase";
import { firestorePlanCollection } from "../../const";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { getCurrentPlan, getEndDay, getStartDay } from "../../slice";
import { Moment } from "moment";
import { Product } from "./Product";
import { Root } from "./styles";
import { Divider } from "@material-ui/core";

export const List: FC = () => {
  const [user] = useAuthState(auth);

  const [data]: any[] = useDocumentData(
    !user ? null : firestore.collection(firestorePlanCollection).doc(user.uid)
  );

  const currentPlan = useSelector(getCurrentPlan);
  const products = useMemo(() => (currentPlan ? data?.[currentPlan] : []), [
    currentPlan,
    data
  ]);

  const startDate = useSelector(getStartDay);
  const endDate = useSelector(getEndDay);

  const getDayIndex = (date: Moment) =>
    (date.week() * 7 + date.day()) % products.length;
  const startDay: number = products && getDayIndex(startDate);
  const endDay: number = products && getDayIndex(endDate);

  const getVisibleDays = useCallback(() => {
    const arr = [] as any[];

    if (isNaN(endDay)) return arr;
    let i = startDay;
    for (; i % products.length !== endDay; i++) {
      arr.push(products[i % products.length]);
    }
    arr.push(products[i % products.length]);
    return arr;
  }, [products, startDay, endDay]);

  const visibleProducts = useMemo(() => {
    return !products
      ? null
      : Object.entries(
          getVisibleDays().reduce((acc, curr) => {
            for (const [name, amount] of Object.entries(curr)) {
              if (!acc[name]) acc[name] = 0;
              acc[name] += amount;
            }
            return acc;
          }, {})
        );
  }, [getVisibleDays, products]);

  if (!data || !(currentPlan in data)) return <div>Choose your plan.</div>;

  return (
    <Root>
      {visibleProducts?.map(([name, amount]) => (
        <Fragment key={name}>
          <Product name={name} amount={amount as any} />
          <Divider />
        </Fragment>
      ))}
    </Root>
  );
};
