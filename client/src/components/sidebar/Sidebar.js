import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Link } from "react-router-dom";
import SidebarAbout from "./SidebarAbout";
import SidebarMembership from "./SidebarMembership";
import SidebarIslam from "./SidebarIslam";
import SidebarSchools from "./SidebarSchools";
import SidebarActivities from "./SidebarActivities";
import SidebarServices from "./SidebarServices";
import SidebarContact from "./SidebarContact";

const styles = theme => ({
  root: {
    width: "100%"
  },
  appBarDesktop: {
    [theme.breakpoints.down("xs")]: {
      top: "auto",
      bottom: 0
    }
  },
  appBarMobile: {
    top: "auto",
    bottom: 0
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
    width: "100%",
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
  }
});

class Sidebar extends Component {
  state = {
    itemOpen: false
  };

  handleClick = () => {
    this.setState(state => ({ itemOpen: !state.itemOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.list}>
        <List component="nav" className={classes.root}>
          <Link to="/">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Divider />
          <SidebarAbout />
          <SidebarMembership />
          <SidebarIslam />
          <SidebarSchools />
          <SidebarActivities />
          <SidebarServices />
          <SidebarContact />
          <Divider />
          <ListItem button>
            <ListItemText primary="Donate" />
          </ListItem>
        </List>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidebar);
