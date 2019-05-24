import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import prayTimes from "./PrayerCalc";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import prayer from "../prayer.svg";
import axios from "axios";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class PrayerTimes extends React.Component {
  state = {
    open: false,
    todayHijri: "",
    hijriWeekday: "",
    hijriDay: "",
    hijriMonth: "",
    hijriYear: ""
  };
  componentDidMount() {
    axios.get(`https://api.aladhan.com/v1/hToG`).then(res => {
      // const todayHijri = res.data;
      const todayGregorian = res.data.data.gregorian;
      const gregorianDay = todayGregorian.day;
      const gregorianWeekday = todayGregorian.weekday.en;
      const gregorianMonth = todayGregorian.month.en;
      const gregorianYear = todayGregorian.year;
      const todayHijri = res.data.data.hijri;
      const hijriDay = todayHijri.day;
      const hijriWeekday = todayHijri.weekday.en;
      const hijriMonth = todayHijri.month.en;
      const hijriYear = todayHijri.year;
      this.setState({
        todayGregorian,
        gregorianWeekday,
        gregorianDay,
        gregorianMonth,
        gregorianYear,
        todayHijri,
        hijriWeekday,
        hijriDay,
        hijriMonth,
        hijriYear
      });
      console.log(res.data);
      console.log({
        todayHijri,
        todayGregorian
      });
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // handleNextDay = () => {
  //   this.date = date.addDays(1);
  // };

  render() {
    const { classes } = this.props;

    const {
      todayGregorian,
      gregorianWeekday,
      gregorianDay,
      gregorianMonth,
      gregorianYear,
      todayHijri,
      hijriWeekday,
      hijriDay,
      hijriMonth,
      hijriYear
    } = this.state;
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    const date = new Date(); // /today
    console.log(date);

    const times = prayTimes.getTimes(date, [35.790013, -78.691178], -5);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return (
      <ModalContainer>
        <IconButton onClick={this.handleClickOpen}>
          <img src={prayer} alt="" height="25" />
        </IconButton>

        <Dialog
          fullWidth
          className={classes.root}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Prayer Times"}
          </DialogTitle>
          <DialogContent>
            <p className="text-left">
              {gregorianWeekday}, {gregorianMonth} {gregorianDay},{" "}
              {gregorianYear}
            </p>
            <p className="text-left">
              {hijriWeekday}, {hijriMonth} {hijriDay}, {hijriYear}
            </p>
            {/* <button onClick={(this.date = date.setDate(date.getDate() + 1))}>
              next
            </button> */}

            <div align="center" id="table">
              <table className="table" id="timetable">
                <thead>
                  <tr>
                    <th scope="col">Prayer</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Fajr</th>
                    <td>{times["Fajr".toLowerCase()]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Shuruq</th>
                    <td>{times["Sunrise".toLowerCase()]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Dhuhr</th>
                    <td>{times["Dhuhr".toLowerCase()]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Asr</th>
                    <td>{times["Asr".toLowerCase()]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Maghrib</th>
                    <td>{times["Maghrib".toLowerCase()]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Isha</th>
                    <td>{times["Isha".toLowerCase()]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ModalContainer>
    );
  }
}

const ModalContainer = styled.div`
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // background: rgba(0, 0, 0, 0.3);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  th {
    font-family: verdana;
    font-size: 12px;
    color: #404040;
  }
  #timetable {
    border-width: 1px;
    border-style: outset;
    border-collapse: collapse;
    border-color: gray;
    width: 9em;
  }
  #timetable td,
  #timetable th {
    border-width: 1px;
    border-spacing: 1px;
    padding: 2px 4px;
    border-style: inset;
    border-color: #cccccc;
  }
  #timetable th {
    color: black;
    text-align: center;
    font-weight: bold;
    background-color: #f8f7f4;
  }
`;
PrayerTimes.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PrayerTimes);
