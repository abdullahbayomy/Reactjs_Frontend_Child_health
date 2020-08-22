import React from 'react';
import User from './User/User';

const userControl = (props) => {
  return props.persons.map((person) => {
    return (
      <User
        name={person.name}
        email={person.email}
        phone={person.phone}
        key={person.id}
        helpId={person.id}
        clicked={props.clickToShow}
      />
    );
  });
};

export default userControl;
