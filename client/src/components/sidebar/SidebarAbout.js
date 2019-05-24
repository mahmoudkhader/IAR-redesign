import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
  nested: {
    paddingLeft: theme.spacing.unit * 4
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

class SidebarAbout extends Component {
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
        {/* About */}
        <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="About" />
            {this.state.itemOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.itemOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/donate">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Donate" />
                </ListItem>
              </Link>
              <Link to="/downloads">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Downloads" />
                </ListItem>
              </Link>
              <Link to="faq">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="FAQ" />
                </ListItem>
              </Link>
              <Link to="/history">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="History" />
                </ListItem>
              </Link>
              <Link to="/jobs">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Jobs" />
                </ListItem>
              </Link>
              <Link to="/officialstatements">
                <ListItem button className={classes.nested}>
                  <ListItemText inset primary="Official Statements" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

SidebarAbout.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SidebarAbout);
