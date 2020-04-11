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
import {
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
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
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((headCell) => (
              <StyledTableCell key={headCell}>{headCell}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.values.map((row, idx) => (
            <StyledTableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.invesmentType.toUpperCase()}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                {formatter.format(row.initalUnitaryPrice)}
              </TableCell>
              <TableCell align="right">
                {formatter.format(row.finalUnitaryPrice!)}
              </TableCell>
              <TableCell align="right">
                {formatter.format(row.profit!)}
              </TableCell>
              <TableCell align="right">{row.startingDate}</TableCell>
              <TableCell align="right">{getEndingDate(row)}</TableCell>
              <TableCell align="right">
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
