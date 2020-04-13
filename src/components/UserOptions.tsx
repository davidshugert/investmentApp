import React from "react";
import { InvTypes } from "../interfaces/index";
import { Button } from "@material-ui/core";
import { snackbarService } from "uno-material-ui";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      margin: "5px 5px 0px",
    },
  })
);
interface UserOptionsProps {
  investments: InvTypes[];
  setInvestments: (Inv: any) => void;
  firebase: any;
}
const UserOptions = ({
  investments,
  setInvestments,
  firebase,
}: UserOptionsProps) => {
  const classes = useStyles();
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        className={classes.menuButton}
        onClick={async () => {
          console.log(investments);
          try {
            const response: any = await firebase.saveInvestments(investments);
            console.log(response);
            snackbarService.showSnackbar(
              "Saved Investments to the cloud",
              "success"
            );
          } catch (error) {
            console.log(error);
            snackbarService.showSnackbar("Error on Saving", "error");
          }
        }}
      >
        Save Investments
      </Button>
      <Button
        color="default"
        variant="contained"
        className={classes.menuButton}
        onClick={async () => {
          try {
            const response: any = await firebase.getInvestments();
            console.log(response);
            setInvestments(response);
            snackbarService.showSnackbar("Restored Investments!", "info");
          } catch (error) {}
        }}
      >
        Get Investments
      </Button>
    </>
  );
};

export default UserOptions;
