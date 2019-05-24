import React, { Component } from "react";

export default class OfficialStatements extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>Official Statements</h1>
            <h3>Official Statement on Terror</h3>
            <p className="my-2">
              "He who kills a soul, it shall be as if he had killed all mankind;
              and he who saves a life, it shall be as if he had given life to
              all mankind."- The Holy Quran 5:32
            </p>
            <p className="my-2">
              The Islamic Association of Raleigh strongly condemns terrorism. We
              stand arm and arm with our fellow Americans in renouncing any
              twisted mindset that would falsely claim to justify acts of
              senseless violence. As members of a diverse and vibrant community,
              we are committed to working together with our neighbors and fellow
              Americans for the common good.
            </p>
            <p className="my-2">
              For more information please contact us at{" "}
              <a href="media@islam1.org" className="">
                media@islam1.org
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
