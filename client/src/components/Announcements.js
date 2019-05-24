import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import announcements from "./announcements/index";
import Card from "@material-ui/core/Card";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CardActions from "@material-ui/core/CardActions";

const announcementList = [
  {
    title: "Ramadan Babysitting",
    date: "May 19, 2019",
    subtitle:
      "The Women's Committee will provide child care free of charge in the Al-Iman school (Red brick) building during Ramadan. Please read the following guidelines before dropping off your children:",
    links: ["Read Guidelines", "Sign-up Link"]
  },
  {
    title: "Does Disability impact your family?",
    date: "May 13th, 2019",
    subtitle:
      'IAR is working towards a Silver certification from MUHSEN for providing a friendly environment for special needs families. Muhsen (Muslims Understanding and Helping Special Education Needs) is a non - profit umbrella organization serving the Muslim community to establish a more inclusive "Special Needs Friendly" environment for our Brothers & Sisters living with Disabilities. Muhsen will advocate, educate, train and implement programs and services nationwide to improve access to Masajid for individuals with Special Needs as well as acceptance and inclusion by the community in all aspects.',
    links: ["Take survey"]
  },
  {
    title: "Hiring Cleaning Crew",
    date: "May 13th, 2019",
    subtitle:
      "Islamic Association of Raleigh (IAR), a non-profit organization, seeks cleaning individuals part-time, full time, day or night shifts. IAR is looking for energetic, and driven individuals to join the IAR.",
    links: ["Job Details"]
  }
];
const styles = theme => ({
  card: {
    // maxWidth: 400
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    marginRight: 8,
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

class Announcements extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Card className={classes.card}>
        <List subheader={<ListSubheader>Announcements</ListSubheader>}>
          {/* {announcementList.map(({ title, subtitle, link }) => (
            <React.Fragment key={title}>
              <ListItem button>
                <ListItemText>
                  <Typography title>{title}</Typography>
                  <Typography subtitle>{subtitle}</Typography>
                  <Typography link>{link}</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))} */}
          {announcementList.map(({ title, date, subtitle, links }) => (
            <React.Fragment key={title}>
              <ExpansionPanel
                expanded={expanded === title}
                onChange={this.handleChange(title)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{title}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {date}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{subtitle}</Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                  <Typography variant="caption">
                    {links.map(link => (
                      <a
                        key={link}
                        href="#sub-labels-and-columns"
                        className={classes.link}
                      >
                        {link}
                      </a>
                    ))}
                  </Typography>
                </ExpansionPanelDetails>
                <Divider />

                <ExpansionPanelActions>
                  <Button size="small" color="primary">
                    Details
                  </Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
              {/* <Divider /> */}
            </React.Fragment>
          ))}
          {/* <ListItem>
            <ListItemText>
              <ListItemSecondaryAction>
                <Button size="small" color="primary">
                  Show More
                </Button>
              </ListItemSecondaryAction>
            </ListItemText>
          </ListItem> */}
          {/* <ListItem button>
            <ListItemText>
              <Button size="small" color="primary">
                Show More
              </Button>
            </ListItemText>
          </ListItem> */}
        </List>
        <CardActions>
          <Button size="small" color="primary">
            Show More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Announcements.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Announcements);
