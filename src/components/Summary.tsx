import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  flex-grow: 1.5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface SummaryData {
  values: { initial: number; current: number; profit: number };
}
const Summary = (props: SummaryData) => {
  return (
    <SummaryContainer>
      <Item>
        <h3>Inital Invesment</h3>
        <p>{formatter.format(props.values.initial)}</p>
      </Item>
      <Item>
        <h3>Current Invesment</h3>
        <p>{formatter.format(props.values.current)}</p>
      </Item>
      <Item>
        <h3>Total Profit</h3>
        <p>{formatter.format(props.values.profit)}</p>
      </Item>
    </SummaryContainer>
  );
};

export default Summary;
