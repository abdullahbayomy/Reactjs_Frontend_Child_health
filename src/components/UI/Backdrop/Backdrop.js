import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) =>
  props.show ? (
    <div
      style={{
        display: props.show ? 'block' : 'none',
      }}
      className={classes.Backdrop}
      onClick={props.clicked}
    ></div>
  ) : null;

export default backdrop;
