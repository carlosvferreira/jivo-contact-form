import React from 'react';

const Name = props => {

  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control control-error';
  }

  else if (props.touched && props.valid) { 
    formControl = "form-control field-valid";
  }

  return (
    <div className="form-group" id="Name">
      <input type="text" className={formControl} {...props} />
    </div>
  );
}

export default Name;