import React, { Component } from "react";
import ImamAbuTaleb from "./ImamAbuTaleb";
import ImamDahnoun from "./ImamDahnoun";

export default class IarImams extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>Imams of the IAR</h1>
            {/* <h3></h3> */}
            <div className="row">
              <div className="col-lg-6 my-2">
                <ImamAbuTaleb />
              </div>
              <div className="col-lg-6 my-2">
                <ImamDahnoun />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
