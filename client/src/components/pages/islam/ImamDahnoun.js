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
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Imd from "../../../img/imd.png";
const styles = theme => ({
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
    backgroundColor: red[500]
  }
});

class ImamDahnoun extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} src={Imd} />
          }
          title="Imam Muamar Dahnoun"
        />
        <CardContent>
          <Typography component="p">
            Imam Muamar Dahnoun is a native of Palestine and has lived in
            Raleigh, North Carolina since 1993. And since 1998, Imam Muamar has
            been the Islamic Association of Raleigh's main fundraising
            coordinator and youth counselor.
          </Typography>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Imam Muamar received his vocational undergraduate degrees in
              computer science and business when he first arrived to the states
              but his heart was always with pursuing his Islamic studies and
              dedicating his life to serve the Muslim community.
            </Typography>
            <Typography paragraph>
              In 1995 when the American Open University was first established,
              Imam Muamar decided to pursue his undergraduate Islamic & Arabic
              studies from the American Open University in Alexandria, Virginia
              under the supervision of Sheikh Dr. Salah Al Sawy and is currently
              pursuing his Master's degree in Islamic Finance from Guidance
              College in Houston, Texas under the supervision of Sheikh Dr. Main
              Al Qudah.
            </Typography>
            <Typography paragraph>
              Imam Muamar is married and a father of 4 children.
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
      </Card>
    );
  }
}

ImamDahnoun.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImamDahnoun);
