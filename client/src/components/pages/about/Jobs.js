import React, { Component } from "react";

export default class Jobs extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>Job Openings</h1>
            <h3>IAR CEO</h3>
            <p className="my-2">Posted: February 18, 2019</p>
            <p className="my-2">Deadline: March 31, 2019</p>
            <p className="my-2">
              The Islamic Association of Raleigh (IAR), a non-profit membership
              organization, seeks an experienced CEO. The CEO oversees, manages,
              coordinates, and administers all IAR operations in accordance with
              the established and approved goals of IAR. The final selection of
              the successful candidate shall be subject to the approval of the
              IAR Shura.
            </p>
            <p className="my-2">
              Please review the{" "}
              <a href="media@islam1.org" className="">
                media@islam1.org
              </a>{" "}
              before applying for this position.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
