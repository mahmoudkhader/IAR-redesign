import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PrayerTimes from "./components/PrayerTimes";
import Announcements from "./components/Announcements";
import Imams from "./components/Imams";
import Landing from "./components/Landing";
import OfficialStatements from "./components/pages/about/OfficialStatements";
import Jobs from "./components/pages/about/Jobs";
import Donate from "./components/pages/about/Donate";
import Downloads from "./components/pages/about/Downloads";
import FAQ from "./components/pages/about/FAQ";
import History from "./components/pages/about/History";
import Join from "./components/pages/membership/Join";
import IarImams from "./components/pages/islam/IarImams";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <PrayerTimes /> */}
        <div className="container my-5">
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/officialstatements"
            component={OfficialStatements}
          />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/downloads" component={Downloads} />
          <Route exact path="/history" component={History} />
          <Route exact path="/FAQ" component={FAQ} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/Imams" component={IarImams} />
        </div>
      </div>
    </Router>
  );
}

export default App;
