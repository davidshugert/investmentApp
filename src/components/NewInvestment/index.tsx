import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "@material-ui/core";
import InvestmentModal from "./InvesmentModal";
import { InvestmentInital } from "../../interfaces/index";

interface NewInvesmentProps {
  addInvestment: (form: InvestmentInital) => any;
}
const NewInvestment = (props: NewInvesmentProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        size="medium"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Add a new Invesment Modal"
      >
        <div>
          <InvestmentModal
            exitHandler={() => setOpen(false)}
            submitHandler={(form: InvestmentInital) =>
              props.addInvestment(form)
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default NewInvestment;
