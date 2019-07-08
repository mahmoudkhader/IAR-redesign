// Component to deal with slect list group
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  // Below are the possible properties for a text area field
  name,
  value,
  error,
  info,
  onChange,
  //   Pass an array of options into select list group
  options
}) => {
  //   Need to take the options that are passed in and loop through them, map them, and create option tags(like we would in a select list)
  //   We'll create a new variable/object called selectOptions, and set it to the options that are passed in, then we will map through each option
  //   When mapping through the options, we will call each one option and then render an option tag
  const selectOptions = options.map(option => (
    // When rendering the option tag, it will contain a key that will be set tot he option.label, and the value will be set to the option.value
    // Basically, each option will be an array of objects that will have a label and a value
    <option key={option.label} value={option.value}>
      {/* Here, put the option label */}
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        // this value will pertain to the register state's 'name' value
        value={value}
        // This will allow the state of this field to change, otherwise typing wont do anything
        onChange={onChange}
      >
        {/* This is where the options will appear in the form */}
        {selectOptions}
      </select>

      {/* Some fields will have info under the field, so put them here */}
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

// Add proptypes
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
