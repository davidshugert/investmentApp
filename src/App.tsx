import React, { useState, useContext, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  Fab,
  Box,
  Backdrop,
  CircularProgress,
  Button,
} from "@material-ui/core";
import InvestmentTable from "./components/Table";
import NewInvestment from "./components/NewInvestment/index";
import Charts from "./components/Chart";
import CurrencySelector from "./components/CurrencySelector";
import Summary from "./components/Summary";
import Layout from "./components/shared/Layout";

import { InvestmentInital, InvTypes } from "./interfaces/index";
import InvesmentData from "./hooks/InvestmentData";
import { FirebaseContext } from "./components/firebase";

interface InvesmentDataInt {
  tableValues: InvTypes[];
  investments: InvTypes[];
  addInvesment: (form: InvestmentInital) => void;
  deleteInvesment: (index: number) => void;
  refreshInvesment: () => void;
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
  }: InvesmentDataInt = InvesmentData();

  const summary = tableValues.reduce(
    (acc, invesment) => {
      acc.initial += invesment.initalPrice;
      acc.current += invesment.finalPrice!;
      acc.profit += invesment.profit!;
      return acc;
    },
    {
      initial: 0,
      current: 0,
      profit: 0,
    }
  );
  return (
    <Layout>
      {!(isLoading || !firebaseInitialized) && (
        <>
          <Button
            color="default"
            variant="contained"
            onClick={() => {
              console.log(firebase.isSignedIn);
              console.log(firebase.auth.currentUser);
            }}
          >
            info
          </Button>
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <CurrencySelector refresh={refreshInvesment} />
            <Box display={firebase.isSignedIn}>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  console.log(investments);
                  const response: any = await firebase.saveInvestments(
                    investments
                  );
                  console.log(response);
                }}
              >
                Save Investments
              </Button>
              <Button
                color="default"
                variant="contained"
                onClick={async () => {
                  const response: any = await firebase.getInvestments();
                  console.log(response);
                }}
              >
                Get Investments
              </Button>
            </Box>
          </Box>
          {tableValues.length > 0 && (
            <>
              <Box
                display="flex"
                justifyContent={tableValues.length ? "flex-start" : "center"}
                mr={3}
                mb={1}
              >
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
              <Charts values={summary} />
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
