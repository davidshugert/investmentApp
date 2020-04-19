import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { InvTypes } from "../interfaces/index";
import { Box } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { SummaryData } from "../interfaces";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

let renderLabel = function(entry: any) {
  console.log(entry);
  return `${entry.name} ${(entry.percent * 100).toFixed(2)}%`;
};
let customTooltip = function(props: any) {
  if (!props.active) return;
  const value =
    props && props.payload
      ? props.payload[0].value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })
      : "";
  return `${value}`;
};
interface ChartHandlerProps {
  type: string;
  values: SummaryData;
}
const ChartHandler = ({ type, values }: ChartHandlerProps) => {
  if (type === "Total") {
    const data = Object.entries(values)
      .filter(([name]) => ["initial", "current", "profit"].includes(name))
      .map(([name, value]) => {
        return { name: name.toUpperCase(), value };
      });
    return (
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 0,
          left: 20,
          bottom: 5
        }}
        width={400}
        height={250}
        key={type}
      >
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "price",
            angle: -90,
            position: "insideLeft",
            offset: -10
          }}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#3f51b5" />
      </BarChart>
    );
  } else if (type === "Investment Type") {
    const data = [
      { name: "Fixed", value: Math.trunc(values.initialPrices.fixed) },
      { name: "Stock", value: Math.trunc(values.initialPrices.stock) },
      { name: "Crypto", value: Math.trunc(values.initialPrices.crypto) }
    ];
    return (
      <PieChart
        margin={{
          top: 15,
          right: 0,
          left: 20,
          bottom: 5
        }}
        width={450}
        height={250}
        key={type}
      >
        <Pie
          dataKey="value"
          data={data}
          isAnimationActive={true}
          labelLine={true}
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={customTooltip} />
      </PieChart>
    );
  }
  return <p key='123'></p>;
};

interface ChartsData {
  values: SummaryData;
  allValues: InvTypes[];
}
const Charts = (props: ChartsData) => {
  const [chartType, setChartType] = useState("Total");
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ flex: "1" }}
    >
      <div style={{ marginRight: "10px" }}>Select data type: </div>
      <Select
        value={chartType}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setChartType(event.target.value as string);
        }}
      >
        <MenuItem value={"Total"}>Total</MenuItem>
        <MenuItem value={"Investment Type"}>Investment Type</MenuItem>
      </Select>
      <ChartHandler type={chartType} values={props.values} />
    </Box>
  );
};

export default Charts;
