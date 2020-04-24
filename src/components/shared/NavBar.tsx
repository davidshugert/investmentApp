import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import { FirebaseContext } from "../firebase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Link from "@material-ui/core/Link";

const UserContainer = styled.div`
  margin-right: 15px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 260,
    fontSize: theme.typography.pxToRem(11),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

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
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Help</Typography>
                  <h3>Explanation</h3>
                  <p>To add a new investment click on the red "+" icon.</p>
                  <p>
                    The refresh icon will update the prices and summary/chart
                    section.Refreshing is done every time a investment gets
                    updated or when you access the page for the first time.
                  </p>
                  <div>
                    If you sign in with your google account you will have access
                    to 2 new buttons.
                    <em>{"Save investments"}</em> will save your currently
                    loaded investments to the cloud.{" "}
                    <em>{"Load Investments"}</em> will look into the cloud for
                    your investments and load them in. Your investments also get
                    saved if not logged in on your local storage browser.
                  </div>
                  <h3>Details</h3>
                  <p>
                    There are 2 types of investments, <em>Fixed</em> and{" "}
                    <em>Variable.</em>
                  </p>
                  <p>
                    Fixed investments are the ones that you know that the return
                    of investment and a interest is guaranteed, for example a
                    bond.
                  </p>
                  <p>
                    Variable investments are the ones that prices change due to
                    market behavior. This app supports CryptoCurrencies and
                    Stocks.
                  </p>
                  <p>
                    Current CryptoCurrencies accepted are:
                    <ul>
                      <li>BTC</li>
                      <li>ETH</li>
                      <li>ZEC</li>
                      <li>BCH</li>
                      <li>LTC</li>
                    </ul>
                  </p>
                </React.Fragment>
              }
            >
              <HelpIcon style={{marginRight:'8px'}}/>
            </HtmlTooltip>
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
