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

class SidebarServices extends Component {
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
        {/* Services */}
        <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="Services" />
            {this.state.itemOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.itemOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Cemetery" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Hajj" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Endowment Fund" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Social and Welfare" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Outreach Resources" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Matrimonial Services" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Counseling and Mental Health" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Special Needs Services" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Al-Ma'idah Kitchen" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Library" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Security and Safety" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Facilities Management" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Facilities Reservation" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="PO Form" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

SidebarServices.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SidebarServices);
