import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import {
  FixedInvesmentProperties,
  VariableInvesmentProperties,
} from "../interfaces";

const header: string[] = [
  "Type",
  "Name",
  "Quantity",
  "Initial Value",
  "Current Value",
  "Profit",
  "Starting Date",
  "Ending Date",
  "Delete",
];

interface TableData {
  values: (VariableInvesmentProperties | FixedInvesmentProperties)[];
  deleteRow: (index: number) => void;
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(even)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function (props: TableData) {
  const getEndingDate = (
    row: VariableInvesmentProperties | FixedInvesmentProperties
  ) => {
    if ("endingDate" in row) {
      return row.endingDate;
    } else {
      return "N/A";
    }
  };
  const getVariableName = (row: any) => {
    if (row.variableType === "crypto") {
      return `Crypto - ${row.name.substring(0, row.name.length - 3)}`;
    }
    return `Stock - ${row.name}`;
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((headCell) => (
              <StyledTableCell key={headCell} align="center">
                {headCell}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.values.map((row, idx) => (
            <StyledTableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.invesmentType}
              </TableCell>
              <TableCell align="center">
                {row.invesmentType == "fixed" ? row.name : getVariableName(row)}
              </TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">
                {formatter.format(row.initalUnitaryPrice)}
              </TableCell>
              <TableCell align="center">
                {formatter.format(row.finalUnitaryPrice!)}
              </TableCell>
              <TableCell align="center">
                {formatter.format(row.profit!)}
              </TableCell>
              <TableCell align="center">{row.startingDate}</TableCell>
              <TableCell align="center">{getEndingDate(row)}</TableCell>
              <TableCell align="center">
                <CloseSharpIcon
                  fontSize="default"
                  color="secondary"
                  onClick={() => props.deleteRow(idx)}
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
