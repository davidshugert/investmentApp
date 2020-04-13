import React from "react";
import { Container } from "@material-ui/core";
import { SnackbarContainer } from "uno-material-ui";

import NavBar from "./NavBar";

const Layout: React.FunctionComponent = (props) => {
  return (
    <Container>
      <NavBar />
      {props.children}
      <SnackbarContainer />
    </Container>
  );
};

export default Layout;
