import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Link } from "react-router-dom";

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

class SidebarActivities extends Component {
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
        {/* Activities */}
        <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="Activities" />
            {this.state.itemOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.itemOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Education Program" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Sports" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Special Events" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Youth Program" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Older Adult Program" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Calendar" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

SidebarActivities.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SidebarActivities);
