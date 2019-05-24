import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import logo from "../img/logo.png";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import PrayerTimes from "./PrayerTimes";
import Sidebar from "./sidebar/Sidebar";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Link } from "@material-ui/core";

const drawerWidth = 240;

const colorTheme = createMuiTheme({
  palette: {
    primary: { main: "#3e2723" }
  }
});

const styles = theme => ({
  root: {
    width: "100%"
  },
  // appBar: {
  //   top: "auto",
  //   bottom: 0
  // },
  appBar: {
    zIndex: 2
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: 200,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  logo: {
    height: 50,
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  }
});

class Navbar extends React.Component {
  state = {
    open: false,
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    console.log(w, h);

    const { classes, theme } = this.props;

    return (
      <MuiThemeProvider theme={colorTheme}>
        <div className={classes.root}>
          {/* {this.state.layoutMode === "desktop" ? desktopBar : mobileBar} */}
          <AppBar position="fixed" className={classes.appBar}>
            {/* {toolBar} */}
            <Toolbar>
              <div>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  open={this.state.left}
                  onClose={this.toggleDrawer("left", false)}
                  onOpen={this.toggleDrawer("left", true)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer("left", true)}
                    onKeyDown={this.toggleDrawer("left", true)}
                  >
                    <Sidebar />
                  </div>
                </SwipeableDrawer>
              </div>
              <Typography variant="h6" color="inherit" noWrap>
                <a href="/">
                  <img
                    src={logo}
                    alt="Islamic Association of Raleigh"
                    className={classes.logo}
                  />
                </a>
              </Typography>
              <div className={classes.grow} />
              {isWidthUp("sm", this.props.width) ? (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              ) : (
                <div>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </div>
              )}
              <PrayerTimes />
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
