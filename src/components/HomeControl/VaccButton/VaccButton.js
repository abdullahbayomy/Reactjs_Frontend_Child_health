import React from 'react';
import classes from './VaccButton.css';

const vaccButton = (props) => {
  return (
    <button className={classes.VaccButton} onClick={props.clicked}>
      {props.vaccName}
    </button>
  );
};

export default vaccButton;
