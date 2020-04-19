import React, { useState, useContext, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Fab, Box, Backdrop, CircularProgress } from "@material-ui/core";

import InvestmentTable from "./components/Table";
import NewInvestment from "./components/NewInvestment/index";
import Charts from "./components/Chart";
import UserOptions from "./components/UserOptions";
import CurrencySelector from "./components/CurrencySelector";
import Summary from "./components/Summary";
import Layout from "./components/shared/Layout";

import {
  InvestmentInital,
  InvTypes,
  VariableInvesmentProperties,
  SummaryData
} from "./interfaces/index";
import InvesmentData from "./hooks/InvestmentData";
import { FirebaseContext } from "./components/firebase";

interface InvesmentDataInt {
  tableValues: InvTypes[];
  investments: InvTypes[];
  addInvesment: (form: InvestmentInital) => void;
  deleteInvesment: (index: number) => void;
  refreshInvesment: () => void;
  setInvestments: any;
  isLoading: boolean;
}
const App = () => {
  const firebase: any = useContext(FirebaseContext);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then((val: any) => {
      setFirebaseInitialized(true);
    });
  });

  const {
    tableValues,
    addInvesment,
    deleteInvesment,
    refreshInvesment,
    isLoading,
    investments,
    setInvestments
  }: InvesmentDataInt = InvesmentData();

  const summPre = tableValues.reduce(
    (acc, invesment) => {
      acc.initial += invesment.initalPrice;
      acc.current += invesment.finalPrice!;
      acc.profit += invesment.profit!;
      acc.initialPrices[invesment.invesmentType] += invesment.initalPrice;
      acc.finalPrices[invesment.invesmentType] += invesment.finalPrice!;
      if (invesment.invesmentType === "variable") {
        acc.initialPrices[
          (invesment as VariableInvesmentProperties).variableType
        ] += invesment.initalPrice;
        acc.finalPrices[
          (invesment as VariableInvesmentProperties).variableType
        ] += invesment.finalPrice!;
      }

      return acc;
    },
    {
      initial: 0,
      current: 0,
      profit: 0,
      initialPrices: {
        fixed: 0,
        variable: 0,
        crypto: 0,
        stock: 0
      },
      finalPrices: {
        fixed: 0,
        variable: 0,
        crypto: 0,
        stock: 0
      }
    }
  );
  const getPerc = (val: number, base: number): number =>
    +((val / base) * 100).toFixed(2);
  const summary: SummaryData = {
    ...summPre,
    percentage: {
      percentage: +((1 - summPre.initial / summPre.current) * 100).toFixed(2), //getPerc(summPre.initial, summPre.current),
      initial: {
        fixed: getPerc(summPre.initialPrices.fixed, summPre.initial),
        variable: getPerc(summPre.initialPrices.variable, summPre.initial),
        crypto: getPerc(
          summPre.initialPrices.crypto,
          summPre.initialPrices.variable
        ),
        stock: getPerc(
          summPre.initialPrices.stock,
          summPre.initialPrices.variable
        )
      },
      final: {
        fixed: getPerc(summPre.finalPrices.fixed, summPre.current),
        variable: getPerc(summPre.finalPrices.variable, summPre.current),
        crypto: getPerc(
          summPre.finalPrices.crypto,
          summPre.finalPrices.variable
        ),
        stock: getPerc(summPre.finalPrices.stock, summPre.finalPrices.variable)
      }
    }
  };
  return (
    <Layout>
      {!(isLoading || !firebaseInitialized) && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <CurrencySelector refresh={refreshInvesment} />
            <Box display={firebase.isSignedIn ? "inline" : "none"}>
              <UserOptions {...{ investments, setInvestments, firebase }} />
            </Box>
          </Box>
          {tableValues.length > 0 && (
            <>
              <Box mr={3} mb={1}>
                <Fab color="primary" aria-label="refresh" size="medium">
                  <RefreshIcon onClick={refreshInvesment} />
                </Fab>
              </Box>
              <InvestmentTable
                values={tableValues}
                deleteRow={deleteInvesment}
              />
            </>
          )}
          <Box
            display="flex"
            flexDirection="row-reverse"
            justifyContent={tableValues.length ? "flex-start" : "center"}
            mr={3}
            mt={1}
          >
            <NewInvestment addInvestment={addInvesment} />
          </Box>
          {tableValues.length > 0 && (
            <Box display="flex">
              <Summary values={summary} />
              <Charts values={summary} allValues={tableValues} />
            </Box>
          )}
        </>
      )}
      <Backdrop open={isLoading || !firebaseInitialized}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};

export default App;
