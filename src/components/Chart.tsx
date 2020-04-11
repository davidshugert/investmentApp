import React from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const ChartsContainer = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

interface ChartsData {
  values: { initial: number; current: number; profit: number };
}
const Charts = (props: ChartsData) => {
  const data = Object.entries(props.values).map(([name, value]) => {
    return { name: name.toUpperCase(), value };
  });
  return (
    <ChartsContainer>
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        width={400}
        height={250}
      >
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "price",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#3f51b5" />
      </BarChart>
    </ChartsContainer>
  );
};

export default Charts;
