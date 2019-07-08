import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <h1>Welcome to the dashboard!</h1>
      <Link to="/newpost">
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.margin}
        >
          <AddIcon className={classes.extendedIcon} />
          Add a post
        </Fab>
      </Link>
      <Link to="/newpage">
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.margin}
        >
          <AddIcon className={classes.extendedIcon} />
          Add a page
        </Fab>
      </Link>
    </div>
  );
}

// Pass in the prop types
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
// Bring profile state and auth state
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
