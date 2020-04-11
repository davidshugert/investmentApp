import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./NavBar";

const Layout: React.FunctionComponent = (props) => {
  return (
    <Container>
      <NavBar />
      {props.children}
    </Container>
  );
};

export default Layout;
