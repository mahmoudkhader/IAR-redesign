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
import https from "https";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: "100%"
  }
});
const today = new Date();

class PrayerTimes extends React.Component {
  state = {
    open: false
  };
  handleApiCall = () => {
    let englishMonth;
    let englishDay;
    let englishYear;
    englishMonth = today.getMonth() + 1;
    englishDay = today.getDate();
    englishYear = today.getFullYear();
    const fullDate = `${englishYear}-${englishMonth}-${englishDay}`;
    console.log(fullDate);
    axios
      .get("/api/hijri/prayer/", {
        params: {
          date: fullDate
          // date: "2019-7-4"
        }
      })
      .then(res => {
        // res.json();
        const athanData = JSON.parse(res.data);
        console.log(athanData);
        const hijriMonth = athanData.hijri.month;
        const hijriDay = athanData.hijri.day;
        const hijriYear = athanData.hijri.year;
        const hijriMonthNum = athanData.hijri.month_numeric;
        const adhanFajr = athanData.adhan.Fajr;
        const adhanShuruq = athanData.adhan.Shuruq;
        const adhanDhuhr = athanData.adhan.Dhuhr;
        const adhanAsr = athanData.adhan.Asr;
        const adhanMaghrib = athanData.adhan.Maghrib;
        const adhanIsha = athanData.adhan.Isha;
        const iqamahFajr = athanData.iqamah.Fajr;
        const iqamahShuruq = athanData.iqamah.Shuruq;
        const iqamahDhuhr = athanData.iqamah.Dhuhr;
        const iqamahAsr = athanData.iqamah.Asr;
        const iqamahMaghrib = athanData.iqamah.Maghrib;
        const iqamahIsha = athanData.iqamah.Isha;
        this.setState({
          hijriMonth,
          hijriDay,
          hijriYear,
          hijriMonthNum,
          adhanFajr,
          adhanShuruq,
          adhanDhuhr,
          adhanAsr,
          adhanMaghrib,
          adhanIsha,
          iqamahFajr,
          iqamahShuruq,
          iqamahDhuhr,
          iqamahAsr,
          iqamahMaghrib,
          iqamahIsha,
          today,
          englishDay,
          englishMonth,
          englishYear
        });
        console.log(res.data);
        console.log({
          hijriMonth,
          hijriDay,
          hijriYear,
          hijriMonthNum,
          adhanFajr,
          adhanShuruq,
          adhanDhuhr,
          adhanAsr,
          adhanMaghrib,
          adhanIsha,
          iqamahFajr,
          iqamahShuruq,
          iqamahDhuhr,
          iqamahAsr,
          iqamahMaghrib,
          iqamahIsha
        });
      });
  };
  componentDidMount() {
    this.handleApiCall();
  }

  handleNextDay = () => {
    const { today } = this.state;
    today.setDate(today.getDate() + 1);
    this.setState({ today: today });
    this.handleApiCall();
  };

  handlePastDay = () => {
    const { today } = this.state;
    today.setDate(today.getDate() - 1);
    this.setState({ today: today });
    this.handleApiCall();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { today } = this.state;
    let resetToday = new Date();
    today.setDate(resetToday.getDate());
    this.handleApiCall();
    this.setState({ open: false, today: today });
  };

  render() {
    const { classes } = this.props;
    const {
      hijriMonth,
      hijriDay,
      hijriYear,
      hijriMonthNum,
      adhanFajr,
      adhanShuruq,
      adhanDhuhr,
      adhanAsr,
      adhanMaghrib,
      adhanIsha,
      iqamahFajr,
      iqamahDhuhr,
      iqamahAsr,
      iqamahMaghrib,
      iqamahIsha
    } = this.state;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const { today, englishMonth, englishDay, englishYear } = this.state;
    const englishMonthName = months[englishMonth - 1];
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
              {englishMonthName} {englishDay}, {englishYear}
            </p>
            <p className="text-left">
              {hijriMonth} {hijriDay}, {hijriYear}
            </p>
            {/* <button onClick={(this.date = date.setDate(date.getDate() + 1))}>
              next
            </button> */}

            <div align="center" id="table">
              <table className="table" id="timetable">
                <thead>
                  <tr>
                    <th scope="col">Prayer</th>
                    <th scope="col">Athan</th>
                    <th scope="col">Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Fajr</th>
                    <td>{adhanFajr}</td>
                    <td>{iqamahFajr}</td>
                  </tr>
                  <tr>
                    <th scope="row">Shuruq</th>
                    <td>{adhanShuruq}</td>
                    <td />
                  </tr>
                  <tr>
                    <th scope="row">Dhuhr</th>
                    <td>{adhanDhuhr}</td>
                    <td>{iqamahDhuhr}</td>
                  </tr>
                  <tr>
                    <th scope="row">Asr</th>
                    <td>{adhanAsr}</td>
                    <td>{iqamahAsr}</td>
                  </tr>
                  <tr>
                    <th scope="row">Maghrib</th>
                    <td>{adhanMaghrib}</td>
                    <td>{iqamahMaghrib}</td>
                  </tr>
                  <tr>
                    <th scope="row">Isha</th>
                    <td>{adhanIsha}</td>
                    <td>{iqamahIsha}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePastDay} color="primary">
              Previous
            </Button>
            <Button onClick={this.handleNextDay} color="primary">
              Next
            </Button>
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
