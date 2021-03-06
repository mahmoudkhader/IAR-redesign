// Class based component
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// classnames is no longer used since we are pulling everythign from teh TextFieldGroup component
// import classnames from "classnames";
import { loginUser } from "../../actions/authActions";
// Import the textfieldgroup function
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  // To change component state (not class state, like wiht redux) use a constructor (see the registration doc for notes)
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // If you want to avoid using bind and putting it into the constructor, we can use arrow functions. To ddo that, get rid of the bind statements above, and replace the onchange statements below with the commented code:
  }
  //   onChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  //  }

  componentDidMount() {
    // Check to see if user is logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  // this.setState({ [e.target.name]: e.target.value });

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // Now, call the action
    this.props.loginUser(userData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const userData = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };
  //   // Now, call the action
  //   this.props.loginUser(userData);
  // }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                {/* Instead of having hte form-group div, use the imported TextFieldGroup component */}
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                {/* <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    // this value will pertain to the register state's 'name' value
                    value={this.state.email}
                    // This will allow the state of this field to change, otherwise typing wont do anything
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div> */}
                {/* Same for passowrd input */}
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    // this value will pertain to the register state's 'name' value
                    value={this.state.password}
                    // This will allow the state of this field to change, otherwise typing wont do anything
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div> */}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
