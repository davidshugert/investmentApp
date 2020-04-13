import React, { useEffect } from "react";
import styled from "styled-components";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import getCachedData from "../hooks/getCachedData";
import { getCurrencyRates } from "../lib/utils/index";
import stickyValue from "../hooks/stickyValue";

const CurrencyContainer = styled.div`
  margin: 2em 1em 1em;
`;
interface CurrencySelectorInterface {
  refresh: () => void;
}
export default function (props: CurrencySelectorInterface) {
  const rates = getCachedData(getCurrencyRates, "rates", 60);
  const [currency, setCurrency] = stickyValue("USD", "userCurrency");
  useEffect(() => {
  }, [currency, props]);
  return (
    <CurrencyContainer>
      {rates && Object.keys(rates.rates).length && (
        <>
          <InputLabel id="InvesmentType" shrink>
            Select Your Currency
          </InputLabel>
          <Select
            id="InvesmentType"
            value={currency}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setCurrency(e.target.value as string);
              setTimeout(() => {
                props.refresh();
              }, 100);
            }}
          >
            {Object.keys(rates.rates).map((curr: string) => {
              return (
                <MenuItem value={curr} key={curr}>
                  {curr}
                </MenuItem>
              );
            })}
          </Select>
        </>
      )}
    </CurrencyContainer>
  );
}
