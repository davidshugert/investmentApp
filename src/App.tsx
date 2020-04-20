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

import { InvestmentInital, InvTypes } from "./interfaces/index";
import InvesmentData from "./hooks/InvestmentData";
import { FirebaseContext } from "./components/firebase";
import getSummary from "./lib/summaryProccesing";

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

  const summary = getSummary(tableValues);
  const hasInvestments = tableValues.length > 0;
  const hasLoad = !(isLoading || !firebaseInitialized);
  return (
    <Layout>
      {hasLoad ? (
        <>
          {/* Currency selector and Load, Set Buttons */}
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
          {/* Refresh Icon and Investment table */}
          <Box display={hasInvestments ? "inline" : "none"}>
            <Box mr={3} mb={1}>
              <Fab color="primary" aria-label="refresh" size="medium">
                <RefreshIcon onClick={refreshInvesment} />
              </Fab>
            </Box>
            <InvestmentTable values={tableValues} deleteRow={deleteInvesment} />
          </Box>
          {/* Add Investment button*/}
          <Box
            display="flex"
            flexDirection="row-reverse"
            justifyContent={hasInvestments ? "flex-start" : "center"}
            mr={3}
            mt={1}
          >
            <NewInvestment addInvestment={addInvesment} />
          </Box>
          {/* Summary Section */}
          <Box display={hasInvestments ? "flex" : "none"}>
            <Summary values={summary} />
            <Charts values={summary} allValues={tableValues} />
          </Box>
        </>
      ) : (
        <Backdrop open={!hasLoad}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Layout>
  );
};

export default App;
