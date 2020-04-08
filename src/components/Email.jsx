import React from 'react';

const Email = props => {

  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control control-error';
  }

  else if (props.touched && props.valid) { 
    formControl = "form-control field-valid";
  }

  return (
    <div className="form-group" id="Email">
      <input type="email" className={formControl} {...props} />
    </div>
  );
}

export default Email;