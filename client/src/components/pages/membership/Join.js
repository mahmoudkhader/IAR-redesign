import React, { Component } from "react";

export default class Join extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>IAR Membership</h1>
            {/* <h3></h3> */}

            <p className="font-weight-bold my-2">Who can apply:</p>
            <p className="my-2">
              If you are a Muslim of age 16 years or older and live in the
              Triangle area, we would like for you to join our community and
              apply for IAR membership.
            </p>

            <p className="font-weight-bold my-2">How to apply:</p>
            <ol>
              <li>
                You can apply online using{" "}
                <a href="http://members.raleighmasjid.org:81/">
                  IAR Members Portal
                </a>{" "}
                (click on{" "}
                <span className="font-weight-bold">Become a member</span> to
                apply OR <span className="font-weight-bold">Login</span> to
                manage/renew your existing membership).
              </li>
              <li>
                You can also download and print the{" "}
                <a href="https://raleighmasjid.org/downloads/IARmembership_application_2018.pdf">
                  PDF Form
                </a>
                .
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
