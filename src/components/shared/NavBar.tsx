import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { FirebaseContext } from "../firebase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Link from "@material-ui/core/Link";

const UserContainer = styled.div`
  margin-right: 5px;
  margin-left: auto;
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      margin: "5px 10px 0px",
    },
  })
);

const NavBar: React.FunctionComponent = () => {
  const firebase: any = useContext(FirebaseContext);
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => window.location.reload()}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">Investments App</Typography>
          <Typography variant="subtitle2">
            <Link
              href="https://www.davidshugert.com/"
              color="inherit"
              underline="hover"
              style={{
                marginLeft: "10px",
                paddingTop: "10px",
                fontStyle: "italic",
              }}
            >
              by David Shugert
            </Link>
          </Typography>
          <UserContainer>
            {firebase.isSignedIn ? (
              <Button
                color="secondary"
                variant="contained"
                className={classes.title}
                onClick={async () => {
                  await firebase.logout();
                  window.localStorage.setItem("data", JSON.stringify([]));
                  window.location.reload();
                }}
              >
                Log OFF
              </Button>
            ) : (
              <StyledFirebaseAuth
                uiConfig={firebase.uiConfig}
                firebaseAuth={firebase.auth}
              />
            )}
          </UserContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
