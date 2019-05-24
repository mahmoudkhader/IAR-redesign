import React, { Component } from "react";

export default class FAQ extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>Frequently Asked Questions</h1>
            {/* <h3></h3> */}
            <div className="mb-2">
              <p className="font-weight-bold my-2">Where are you located?</p>
              <p className="my-2">
                We are located at{" "}
                <a href="https://raleighmasjid.org/contact/directions.html">
                  808 Atwater Street, Raleigh NC 27607.
                </a>{" "}
                Here are the driving directions to the Islamic Center of
                Raleigh.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">
                At what time are the Friday prayers held?
              </p>
              <p className="my-2">
                We offer three shifts of Friday prayers to alleviate the parking
                problem at the masjid. The first shift is held between 11:30 AM
                - 12:00 noon, the second shift is between 1:00 PM - 1:30 PM.
                These two shifts are held throughout the year at the same time.
              </p>
              <p className="my-2">
                In addition, we offer a third shift of Friday prayers from 3:00
                PM - 3:30 PM during Daylight Saving Time (March to October), to
                make it easy for high school students to attend prayers at the
                Islamic Center of Raleigh.
              </p>
              <p className="my-2">
                From November to February, the third shift of Friday prayers are
                held from 2:10 PM to 2:40 PM due to earlier Asr prayer time.
                Please check the website in November and March for the exact
                date when the time changes for the prayers.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">What is Islam?</p>
              <p className="my-2">
                Here is a very
                <a href="https://raleighmasjid.org/islam/info.html">
                  abridged description of Islam.{" "}
                </a>
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">
                I want to learn more about Islam and visit the Islamic Center of
                Raleigh?
              </p>
              <p className="my-2">
                Please see this page for more information about scheduling a
                visit to the Islamic Center of Raleigh.
              </p>
              <p className="my-2">
                We also offer an{" "}
                <a href="https://raleighmasjid.org/islam/introductory-islamic-classes.html">
                  "Introduction to Islam"
                </a>{" "}
                class every Sunday from 2:00 to 3:00 PM. You do not have to
                register to attend this free class.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">
                Do I need to wear a headscarf to visit the mosque? What should I
                wear when visiting the Islamic Center of Raleigh?
              </p>
              <p className="my-2">
                Please see this article on the
                <a href="https://raleighmasjid.org/islam/visiting-mosque.html">
                  ettiquites of visiting a mosque.
                </a>
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">
                I want to schedule a meeting with the Imam of the Islamic Center
                of Raleigh?
              </p>
              <p className="my-2">
                Both of the Imams have{" "}
                <a href="https://raleighmasjid.org/imam/">
                  regularly scheduled office hours
                </a>
                , however you are strongly encouraged to
                <a href="https://raleighmasjid.org/imam/">
                  schedule an appointment
                </a>{" "}
                prior to your visit.
              </p>
            </div>
            <div className="mb-2">
              <p className="font-weight-bold my-2">
                I want to accept Islam, whom should I contact?
              </p>
              <p className="my-2">
                The Outreach (Da'wah) Committee will be able to assist you.
                Please contact them via email at
                <a href="outreach@islam1.org">outreach@islam1.org </a>
                or at 919 834 9572 ext 333
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
