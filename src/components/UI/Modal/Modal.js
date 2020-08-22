import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/auxilliary';

const modal = (props) => (
  <Aux>
    <div
      className={classes.Modal}
      style={{
        display: props.show ? 'block' : 'none',
        transform: props.show ? 'translateY(0)' : 'translateY(-100)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
