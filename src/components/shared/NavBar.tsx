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
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">
            Finance App
          </Typography>
          <UserContainer>
            {firebase.isSignedIn ? (
              <Button
                color="secondary"
                variant="contained"
                className={classes.title}
                onClick={async () => {
                  await firebase.logout();
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
