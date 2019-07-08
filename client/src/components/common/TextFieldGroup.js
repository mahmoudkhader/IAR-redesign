// Component to deal with text field inputs
// This text field group component will deal with a lot of properties, whcih will go into the parameters of hte TextFieldGroup object
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  // Below are the possible properties for a text field input
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        //   This will contain whatever is included into the type property that is passed in
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        // this value will pertain to the register state's 'name' value
        value={value}
        // This will allow the state of this field to change, otherwise typing wont do anything
        onChange={onChange}
        disabled={disabled}
      />
      {/* Some fields will have info under the field, so put them here */}
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

// Add proptypes
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

// Import the default props
TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
