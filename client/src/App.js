import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PrayerTimes from "./components/PrayerTimes";
import Announcements from "./components/Announcements";
import Imams from "./components/Imams";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

// import OfficialStatements from "./components/pages/about/OfficialStatements";
// import Jobs from "./components/pages/about/Jobs";
// import Donate from "./components/pages/about/Donate";
// import Downloads from "./components/pages/about/Downloads";
// import FAQ from "./components/pages/about/FAQ";
// import History from "./components/pages/about/History";
// import Join from "./components/pages/membership/Join";
// import IarImams from "./components/pages/islam/IarImams";
import jwt_decode from "jwt-decode";

import PostForm from "./components/post/PostForm";
import PageForm from "./components/page/PageForm";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Check if the jwtToken exists (basically if the user is logged in)
if (localStorage.jwtToken) {
  // Set the auth token header auth. This takes in teh token(stored in localStorage) and set it to that valie
  setAuthToken(localStorage.jwtToken);
  // Decode the token and get the user info and expiration time
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for an expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          {/* <PrayerTimes /> */}
          <div className="container my-5 pt-5">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            {/* <Route
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
          <Route exact path="/Imams" component={IarImams} /> */}
            {/* Wrap all private routes in swtich */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/newpost" component={PostForm} />
              <PrivateRoute exact path="/newpage" component={PageForm} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
