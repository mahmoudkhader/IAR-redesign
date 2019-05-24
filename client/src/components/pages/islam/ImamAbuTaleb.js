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
import Ima from "../../../img/ima.png";
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

class ImamAbuTaleb extends React.Component {
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
            <Avatar aria-label="Recipe" className={classes.avatar} src={Ima} />
          }
          title="Imam Mohamed AbuTaleb"
        />
        <CardContent>
          <Typography component="p">
            Mohamed AbuTaleb serves as the Imam of the Islamic Association of
            Raleigh. He is a lifelong student of the Quran and Islamic studies,
            has studied with a number of credentialed scholars and teachers and
            has been blessed to memorize the Holy Quran.
          </Typography>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Mohamed has pursued seminary training through the Cambridge
              Islamic College and Al-Salam Institute in the United Kingdom, and
              studied under teachers trained at Islamic universities in India,
              Saudi Arabia, Syria, Jordan, and Egypt.
            </Typography>
            <Typography paragraph>
              Mohamed also shares a love of science and reason and completed his{" "}
              <a href="https://dspace.mit.edu/handle/1721.1/78441">
                Ph.D. and Master's degrees in electrical engineering from MIT
              </a>{" "}
              along with degrees in physics and mathematics from the University
              of Maryland.
            </Typography>
            <Typography paragraph>
              Imam AbuTaleb has traveled the United States extensively as a
              lecturer, trainer, and educator. He serves as an instructor for
              the OakTree Institute and has collaborated with a myriad of
              organizations and institutions.
            </Typography>
            <Typography paragraph>
              He shares his love of learning with audiences at an array of
              universities, community centers, and places of worship. His style
              enables audiences to couple transformative understanding with
              relevance to daily life, and to cut across labels and divisions
              through scholarship and dialogue.
            </Typography>
            <Typography paragraph>
              Imam AbuTaleb has traveled the United States extensively as a
              lecturer, trainer, and educator. He serves as an instructor for
              the OakTree Institute and has collaborated with a myriad of
              organizations and institutions.
            </Typography>
            <Typography paragraph>
              Previous lectures from Harvard, MIT, Columbia University, Georgia
              Tech, and many others can be found on his{" "}
              <a href="https://www.youtube.com/user/DrMohamedAbutaleb">
                Youtube
              </a>
              ,{" "}
              <a href="https://www.facebook.com/DrMohamedAbutaleb/">Facebook</a>
              , and <a href="https://twitter.com/MohamedAbutaleb">Twitter</a>{" "}
              pages.
            </Typography>
            <Typography paragraph>
              Imam AbuTaleb has sought to mirror the marriage of sacred and
              worldly sciences found in earlier generations of Muslim scholars.
              Complementing his service record in youth work, education, and
              ministry, Mohamed has worked in technical engineering positions
              spanning academia, government, and industry.
            </Typography>
            <Typography paragraph>
              He is happily married and blessed with a young son and a young
              daughter.
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

ImamAbuTaleb.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImamAbuTaleb);
