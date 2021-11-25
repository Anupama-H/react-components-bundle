import React from "react";
import PropTypes from "prop-types";

const FormElementWrapper = (props) => {
    const { className, children, appearance, ...restProps } = props;

    return (<div className={`RCB-form-el-cont RCB-form-el-${appearance} ${className}`} {...restProps}>
        {children}
    </div>);
};

FormElementWrapper.propTypes = {
    /** Pass any additional classNames to Form component */
    className: PropTypes.string,
    appearance: PropTypes.string
};

FormElementWrapper.defaultProps = {
    appearance: "inline"
};

export default FormElementWrapper;