import React from 'react';
import TakenVacc from './TakenVacc/TakenVacc';

const homeControl = (props) => {
  return props.showChild.map((child) => {
    return (
      <TakenVacc
        key={child._id}
        name={child.childName}
        motherName={child.user.name}
        phone={child.user.phone}
        done={props.isDone}
        helpId={child._id}
      />
    );
  });
};

export default homeControl;
