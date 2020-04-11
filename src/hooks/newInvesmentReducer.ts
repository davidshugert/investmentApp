import { useReducer } from "react";
import { format } from "date-fns";

import { InvestmentInital } from "../interfaces/index";
const reducer = (
  state: InvestmentInital,
  action: { type: string; value: any }
) => {
  switch (action.type) {
    case "invesmentType":
      return { ...state, invesmentType: action.value };
    case "variableType":
      return { ...state, variableType: action.value };
    case "name":
      return { ...state, name: action.value };

    case "quantity":
      return { ...state, quantity: action.value };

    case "initalPrice":
      return { ...state, initalPrice: action.value };

    case "finalPrice":
      return { ...state, finalPrice: action.value };

    case "startingDate":
      return { ...state, startingDate: format(action.value, "MMMM dd yyyy") };

    case "endingDate":
      return { ...state, endingDate: format(action.value, "MMMM dd yyyy") };
  }
  return state;
};
const initialState: InvestmentInital = {
  invesmentType: "fixed",
  variableType: "stock",
  name: "",
  quantity: 1,
  initalPrice: 0,
  finalPrice: 0,
  startingDate: format(new Date(), "MMMM dd yyyy"),
  endingDate: format(new Date(), "MMMM dd yyyy"),
};
export default function () {
  const [state, dispatch] = useReducer(reducer, initialState);
  function setState(type: string, value: string | number | Date) {
    dispatch({ type, value });
  }
  return { state, setState };
}
