import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Ima from "../img/ima.png";
import Imd from "../img/imd.png";

const styles = theme => ({
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0
    // paddingTop: "100%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

class Imams extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="Imams of the IAR" />
        <div className="row">
          <div className="col-6">
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Recipe"
                  className={classes.avatar}
                  src={Ima}
                />
              }
              title="Mohamed AbuTaleb"
            />
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Mohamed AbuTaleb serves as the Imam of the Islamic Association
                  of Raleigh. He is a lifelong student of the Quran and Islamic
                  studies, has studied with a number of credentialed scholars
                  and teachers and has been blessed to memorize the Holy Quran.
                </Typography>
              </CardContent>
            </Collapse>
          </div>
          <div className="col-6">
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Recipe"
                  className={classes.avatar}
                  src={Imd}
                />
              }
              title="Muamar Dahnoun"
            />

            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Imam Muamar Dahnoun is a native of Palestine and has lived in
                  Raleigh, North Carolina since 1993. And since 1998, Imam
                  Muamar has been the Islamic Association of Raleigh's main
                  fundraising coordinator and youth counselor.
                </Typography>
              </CardContent>
            </Collapse>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </div>
        </div>
      </Card>
    );
  }
}

Imams.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Imams);
