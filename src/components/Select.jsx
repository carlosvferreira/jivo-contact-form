import React from 'react';

const Select = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    else if (props.touched && props.valid) { 
      formControl = "form-control field-valid";
    }

    return (
        <div className="form-group" id="Select">
            <select className={formControl} value={props.value} onChange={props.onChange} name={props.name} {...props}>
              {props.options.map(option => (
                <option value={option.value} key={option.value}>
                  {option.displayValue}
                </option>
              ))}
            </select>
        </div>
    );
}

export default Select;