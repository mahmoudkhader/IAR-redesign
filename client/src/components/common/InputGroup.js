// Component to deal with inputs wiht spcical styling, like those with social media icons and such

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  // Below are the possible properties for a text area field
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-grou-text">
          <i className={icon} />
        </span>
        {/* Icon goes here: */}
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        // this value will pertain to the register state's 'name' value
        value={value}
        // This will allow the state of this field to change, otherwise typing wont do anything
        onChange={onChange}
      />
      {/* Some fields will have info under the field, so put them here */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

// Add proptypes
InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired
};

// Import the default props
InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
