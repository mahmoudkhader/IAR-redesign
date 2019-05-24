// There are two major portions of the landing page:
// Special announcements (optional)
// Main content
//  The main content will feature announcements, featured content, and the "widgets"
//  Announcements (will show most recent 10, then link to the "all announcements" page)
//  Featured Content (imams, links to lectures, featured series, learn about islam)
//  Widgets: prayer schedule and jumua

import React, { Component } from "react";
import Announcements from "./Announcements";
import Imams from "./Imams";

class Landing extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mt-5">
          <Announcements />
        </div>
        <div className="col-lg-6 mt-5">
          <Imams />
        </div>
      </div>
    );
  }
}

export default Landing;
