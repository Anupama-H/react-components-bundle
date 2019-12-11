import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FormContext } from "./Form";
import FormElementWrapper from "./FormElementWrapper";
import VALIDATORS from "./Validators";

const Input = (props) => {
    const [ error, setError ] = useState();
    const { 
        label, 
        name, 
        type, 
        className, 
        value, 
        defaultValue, 
        placeholder, 
        appearance, 
        onChange,
        validations
    } = props;
    const { onValueChange } = useContext(FormContext);

    const onInputChange = (event) => {
        const value = event.target.value;
        let isValidValue = true;
        let errorMessage;

        for (let i = 0; i < validations.length; i++) {
            const validationObj = validations[i];
            const { type, message = "Invalid field value" } = validationObj;
            isValidValue = VALIDATORS[type](value, validationObj);

            if (!isValidValue) {
                errorMessage = message;
                break;
            }
        }

        if (isValidValue) {
            setError("");
        } else {
            setError(errorMessage);
        }

        if (typeof(onChange) === "function") {
            onChange(value, errorMessage);
        }

        typeof(onValueChange) === "function" && onValueChange(name, value, errorMessage);
    }

    let inputProps = {
        type,
        label,
        name,
        id: name,
        defaultValue,
        placeholder,
        className: "RCB-form-el",
        onChange: onInputChange
    };

    if (typeof(onChange) === "function") {
        /* make it a controlled component if onChange function is given */
        inputProps.value = value;
    }

    return (<FormElementWrapper className={className} appearance={appearance}>
        <label className="RCB-form-el-label" htmlFor={name}>{label}</label>
        <input {...inputProps} />
        {error && <div className="RCB-form-error">{error}</div>}
    </FormElementWrapper>);
};

Input.propTypes = {
    /** Pass any additional classNames to Input component */
    className: PropTypes.string,
    /** Use it to render different input types like text, password etc. */
    type: PropTypes.string,
    /** Label for the input element */
    label: PropTypes.string,
    /** Unique ID for the input element */
    name: PropTypes.string.isRequired,
    /** Will be used only with onChange function, or else ignored */
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    /** Array of validations to perform on the form element value. 
     * If the validation fails, you will get an "error" field in the form onSubmit event */
    validations: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(Object.keys(VALIDATORS)).isRequired,
        message: PropTypes.string.isRequired,
        validator: PropTypes.func
    })),
    placeholder: PropTypes.string,
    /** Define the appearance of the form element. Accepted values are either "inline" or "block" */
    appearance: PropTypes.oneOf(["inline", "block"]),
    /** Becomes a controlled component if onChange function is given */
    onChange: PropTypes.func
};

Input.defaultProps = {
    className: "",
    appearance: "inline",
    validations: []
};

export default Input;