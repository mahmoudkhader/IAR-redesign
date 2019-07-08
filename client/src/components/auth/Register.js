// Class based component
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Axios is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically provides a single API for dealing with XMLHttpRequest s and node's http interface. Besides that, it wraps the requests using a polyfill for ES6 new's promise syntax.
// Basically lets us communicate with the backend throught this component
// import axios from "axios";
// Classnames will allow us to add conditional classnames to our front end code
// classnames is no longer used since we are pulling everythign from teh TextFieldGroup component
// import classnames from "classnames";// Import connect from react-redux, which connects redux to this component similar to a container which is also basically just a react component that works with redux
import { connect } from "react-redux";
// Import the action that registers the user
import { registerUser } from "../../actions/authActions";
// Import the textfieldgroup function
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  // To change component state (not class state, like wiht redux) use a constructor
  constructor() {
    super();
    //   The state is just an object with some values (in this case, we want to replicate our fields for the register user in the backend)
    this.state = {
      // All of these are initialized as empty strings (this will prevent typing unless there is a change event assigned to the state)
      name: "",
      email: "",
      password: "",
      password2: "",
      // Include an empty object to hold errors
      errors: {}
    };
    // This code must go in every single input field, and it basically allows each on to utilize the 'this' property in their respective inputs. Putting it in the constructor makes it reusable so that we arent writing it into every field
    this.onChange = this.onChange.bind(this);
    // Also bind onSubmit
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Check to see if user is logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  //   Create the onChange, which takes in the user parameter e. Badically when the user types this functionwill fire and will set whatever the user is typing in to that input into the state variables
  onChange(e) {
    //   since every field has a 'name' propperty, this will set the state value basedo nt eh name property of the target value (name or email or password or password2). e.target.value is whatever the user types, and e.target.name is the input
    this.setState({ [e.target.name]: e.target.value });
  }

  // New lifecycle method that runs when the component recieves a new property
  componentWillReceiveProps(nextProps) {
    // lets us test certain properties
    // we;ll test the errors property
    // If ther are errors, set the state
    if (nextProps.errors) {
      // if there is an error prop, set the errors variable to that and then set that as the component state
      this.setState({ errors: nextProps.errors });
    }
  }

  // Create the onSubmit function.
  onSubmit(e) {
    // Also, since it is a form we don't want it to contain default behaviorm, so we set e to .preventDefault
    e.preventDefault();

    // This is where we register the user (we will do this with redux)
    // Create a newUser object in the meantime
    const newUser = {
      // put in the registration fields from our backend api
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // This will allow us to use our express routes from the backend to send the form data to the db
    // Pass in the route as the first parameter and the data (stored in newUser) as the second parameter
    // Commenting out axios now that we have Redux
    // axios
    //   .post("/api/users/register", newUser)
    // That gives us a promise, so write .then to send back the data as written in the backend. Check the post route in api/users/register, but basically if it is successful it sends back the user, and if something goes wrong sends backe rror
    // .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
    // To console log the error responses (invalid email, short pass, etc, basically the object that is being sent back with the error)do the following
    //   .catch(err => console.log(err.response.data));
    //   Set the state to be hte errors object, so we wont see the errors but they will be stored in teh current state
    // .catch(err => this.setState({ errors: err.response.data }));
    // Note: we don't need to reference the http:localhost:5000 becasue we listed our proxy value in our package.json
    // console.log(newUser);
    // this.setState({ [e.target.name]: e.target.value });

    // instead, call the actions through the props, and pass the second parameter this.props.history, which allows us to redirect from within the registerUser action
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    //   To display the errors object, you have to destructure the errors from the state
    // We could write the follwoing
    // const errors = this.state.errors;
    // but using curly braces allows us to pull the errors from this.state, rather than having to explicitly define errors as the states errors
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              {/* Add a submit event */}
              {/* Added noValidate to remove the html5 validation check, since we have our own */}
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map all properties in this component to prop types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// register user is an action and also a propterty
// In order to get any of the auth state into our component, must create a mapStateToProps function
const mapStateToProps = state => ({
  // This puts the auth state into a property called authm whcih we can then access using this.props.auth. The auth comes from the root reducer
  auth: state.auth,
  errors: state.errors
});
// Export connect so to connect this to a redux store
// Pass mapStateToProps through the connect function
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register)); // To get this to route correctly, route withRouter
