import React, { useState } from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { InvTypes } from "../interfaces/index";
import { Box } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ChartsContainer = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

interface ChartsData {
  values: { initial: number; current: number; profit: number };
  allValues: InvTypes[];
}
const Charts = (props: ChartsData) => {
  const data = Object.entries(props.values).map(([name, value]) => {
    return { name: name.toUpperCase(), value };
  });
  const [chartType, setChartType] = useState("Total");
  return (
    <ChartsContainer>
      <Box display="flex" flexDirection="row" alignItems="center">
        <div style={{ marginRight: "10px" }}>Select data type: </div>
        <Select
          value={chartType}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setChartType(event.target.value as string);
          }}
        >
          <MenuItem value={"Total"}>Total</MenuItem>
          {/* <MenuItem value={"Type"}>Type</MenuItem> */}
        </Select>
      </Box>
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 0,
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
