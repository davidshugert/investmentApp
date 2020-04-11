import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { VariableType, InvesmentType } from "../../interfaces/index";
import styled from "styled-components";
import { parse } from "date-fns";
import { getCryptoSymbols } from "../../lib/utils/index";
import getCachedData from "../../hooks/getCachedData";
import newInvesmentReducer from "../../hooks/newInvesmentReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      position: "absolute",
      width: "75vw",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 1),
    },
  })
);
interface InvesmentModalProps {
  exitHandler: () => void;
  submitHandler: any;
}
const FormStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  margin: 10px auto;
`;

const InvestmentModal = (props: InvesmentModalProps) => {
  const classes = useStyles();
  const { state, setState } = newInvesmentReducer();
  const cryptoSymbols = getCachedData(getCryptoSymbols, "cryptoSymbols",60*24);
  const isFixed = state.invesmentType === "fixed";
  const onSubmit = () => {
    props.exitHandler();
    props.submitHandler(state);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.paper}>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <FormStyled>
            <div>
              <InputLabel id="InvesmentType" shrink>
                Investment Type
              </InputLabel>
              <Select
                labelId="InvesmentType"
                id="invesmentTypesSelect"
                value={state.invesmentType}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setState("invesmentType", e.target.value as InvesmentType);
                }}
              >
                <MenuItem value={"fixed"}>Fixed</MenuItem>
                <MenuItem value={"variable"}>Variable</MenuItem>
              </Select>
            </div>
            {!isFixed && (
              <div>
                <InputLabel id="VariableInvesmentType" shrink>
                  Type
                </InputLabel>
                <Select
                  labelId="VariableInvesmentType"
                  id="VariableInvestmentType"
                  value={state.variableType}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    setState("variableType", e.target.value as VariableType);
                  }}
                >
                  <MenuItem value={"crypto"}>Cryptocurrency </MenuItem>
                  <MenuItem value={"stock"}>Stock</MenuItem>
                </Select>
              </div>
            )}

            {!isFixed && state.variableType === "crypto" ? (
              <div>
                <InputLabel id="cryptoType" shrink>
                  Symbol
                </InputLabel>

                <Select
                  labelId="cryptoType"
                  value={state.name}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    setState("name", e.target.value as string);
                  }}
                >
                  {cryptoSymbols.map(
                    (crypto: { symbol: string; name: string }) => (
                      <MenuItem value={crypto.symbol} key={crypto.name}>
                        {crypto.name.split(" ")[0]}
                      </MenuItem>
                    )
                  )}
                </Select>
              </div>
            ) : (
              <TextField
                id="name"
                value={state.name}
                label="Name"
                type="string"
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setState("name", e.target.value as string);
                }}
              />
            )}

            {!isFixed && (
              <TextField
                id="quantity"
                value={state.quantity}
                label="Quantity"
                type="number"
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setState("quantity", e.target.value as number);
                }}
              />
            )}

            <TextField
              id="initalPrice"
              value={state.initalPrice}
              label="Initial Total Invested ($)"
              type="number"
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                setState("initalPrice", e.target.value as number);
              }}
            />

            {isFixed && (
              <TextField
                id="finalPrice"
                value={state.finalPrice}
                label="Money to Receive"
                type="number"
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setState("finalPrice", e.target.value as number);
                }}
              />
            )}
            <DatePicker
              value={parse(state.startingDate, "MMMM dd yyyy", new Date())}
              onChange={(date: Date | null) => {
                setState("startingDate", date as Date);
              }}
              format="MMMM dd yyyy"
              label="Starting Date"
              variant="inline"
              animateYearScrolling
              disableFuture
            />
            {isFixed && (
              <DatePicker
                value={parse(state!.endingDate!, "MMMM dd yyyy", new Date())}
                onChange={(date: Date | null) => {
                  setState("endingDate", date as Date);
                }}
                format="MMMM dd yyyy"
                label="Ending Date"
                variant="inline"
                animateYearScrolling
              />
            )}
          </FormStyled>
          <BtnContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={props.exitHandler}
            >
              Exit
            </Button>
          </BtnContainer>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default InvestmentModal;
