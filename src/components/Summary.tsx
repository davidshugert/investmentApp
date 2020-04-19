import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { SummaryData } from "../interfaces";

const SummaryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
const DataCards = (
  title: string,
  body: number,
  shouldChangeColor: boolean = false,
  isPercentage: boolean = false
) => (
  <Card key={title} style={{ margin: "10px" }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography
        variant="body1"
        {...(shouldChangeColor
          ? { style: { color: body > 0 ? "green" : "red" } }
          : {})}
      >
        {isPercentage ? body + "%" : formatter.format(body)}
      </Typography>
    </CardContent>
  </Card>
);

const Summary = (props: { values: SummaryData }) => {
  const summaryCards = [
    {
      title: "Inital Invesment",
      value: props.values.initial,
      color: false,
      percentage: false
    },
    {
      title: "Current Invesment",
      value: props.values.current,
      color: false,
      percentage: false
    },
    {
      title: "Total Profit",
      value: props.values.profit,
      color: true,
      percentage: false
    },
    {
      title: "Percentage",
      value: props.values.percentage.percentage,
      color: true,
      percentage: true
    },
    {
      title: "% in Fixed Inv",
      value: props.values.percentage.initial.fixed,
      color: false,
      percentage: true
    },
    {
      title: "% in Variable Inv",
      value: props.values.percentage.initial.variable,
      color: false,
      percentage: true
    }
  ];
  return (
    <SummaryContainer>
      {summaryCards.map(card =>
        DataCards(card.title, card.value, card.color, card.percentage)
      )}
    </SummaryContainer>
  );
};

export default Summary;
