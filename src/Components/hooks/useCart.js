import React from "react";
import { AppContext } from "../../App";

export function useCart() {
  const { drawerItems } = React.useContext(AppContext);
  const totalPrice = drawerItems.reduce((sum, obj) => sum + obj.price, 0);
  return { drawerItems, totalPrice };
}
