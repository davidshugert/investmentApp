/* eslint-disable react-hooks/exhaustive-deps */
import { InvestmentInital, InvTypes } from "./../interfaces/index";
import { useState, useEffect } from "react";
import stickyValue from "./stickyValue";
import { Variable, Fixed } from "../lib/index";
import { parse } from "date-fns";

export default function () {
  const [tableValues, setTableValues] = useState<InvTypes[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [investments, setInvestments] = stickyValue([], "data");
  const [rates] = stickyValue(null, "rates");

  const userCurrency = () => {
    const value = window.localStorage.getItem("userCurrency");
    return value ? value.replace(/['"]+/g, "") : "USD";
  };

  async function addInvesment(form: InvestmentInital) {
    setLoading(true);
    if (userCurrency() !== "USD") {
      const currentCurrency = userCurrency();
      form.initalPrice = form.initalPrice / rates.rates[currentCurrency];
      form.finalPrice = form.finalPrice / rates.rates[currentCurrency];
    }
    let newInvesment: Variable | Fixed = buildInvestment(form);
    const properties = await newInvesment.getProperties();
    setInvestments([...investments, properties]);
    setLoading(false);
  }
  async function refreshInvesment() {
    setLoading(true);
    let builtInvestments: (Fixed | Variable)[] = buildAll();
    if (builtInvestments.length > 0) {
      console.log("isRefreshing");
      const allProperties = await fetchAllProperties(builtInvestments);
      setTableValues(convertPrices(allProperties));
      setLoading(false);
    }
  }

  function deleteInvesment(index: number) {
    setInvestments([
      ...investments.filter((_: any, idx: number) => idx !== index),
    ]);
  }
  function convertPrices(investments: InvTypes[]) {
    const currentCurrency = userCurrency();
    if (currentCurrency === "USD") return investments;
    const rate = rates.rates[currentCurrency];
    return investments.map((inv) => {
      inv.initalPrice = inv.initalPrice * rate;
      inv.initalUnitaryPrice = inv.initalUnitaryPrice * rate;
      inv.finalPrice = inv.finalPrice! * rate;
      inv.finalUnitaryPrice = inv.finalUnitaryPrice! * rate;
      inv.profit = inv.profit! * rate;
      return inv;
    });
  }

  const buildInvestment = (p: InvestmentInital): Variable | Fixed => {
    let newInvesment: Variable | Fixed;
    if (p.invesmentType === "fixed") {
      newInvesment = new Fixed(
        p.name,
        p.initalPrice,
        p.finalPrice,
        parse(p.startingDate!, "MMMM dd yyyy", new Date()),
        parse(p.endingDate!, "MMMM dd yyyy", new Date())
      );
    } else {
      newInvesment = new Variable(
        p.name,
        p.initalPrice,
        p.quantity,
        p.variableType,
        p.name,
        parse(p.startingDate!, "MMMM dd yyyy", new Date())
      );
    }

    return newInvesment;
  };
  const buildAll = () =>
    investments.map((inv: InvestmentInital) => buildInvestment(inv));
  const fetchAllProperties = async (builtInvestments: (Fixed | Variable)[]) => {
    const allProperties: InvTypes[] = await Promise.all(
      builtInvestments.map(
        (Inv: Fixed | Variable): Promise<InvTypes> => Inv.getProperties()
      )
    );
    return allProperties;
  };
  useEffect(() => {
    let builtInvestments: (
      | Fixed
      | Variable
    )[] = investments.map((inv: InvestmentInital) => buildInvestment(inv));
    if (builtInvestments.length > 0) {
      (async () => {
        setLoading(true);
        const allProperties = await fetchAllProperties(builtInvestments);
        setTableValues(convertPrices(allProperties));
        setLoading(false);
      })();
    } else {
      setTableValues([]);
    }
  }, [investments]);

  return {
    tableValues,
    addInvesment,
    deleteInvesment,
    refreshInvesment,
    isLoading,
  };
}
