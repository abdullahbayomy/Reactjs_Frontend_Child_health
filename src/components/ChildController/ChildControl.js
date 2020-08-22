import React from 'react';

import Child from './Child/Child';

const ChildControl = (props) => {
  return props.children.map((child) => {
    return (
      <Child
        key={child._id}
        name={child.childName}
        date={child.birthDate}
        place={child.birthPlace}
        vaccination={child.vaccination}
        helpId={child._id}
      />
    );
  });
};

export default ChildControl;
