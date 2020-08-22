import React from 'react';

const viewUser = (props) => {
  return (
    <div>
      <h1>hello : {props.match.params.id}</h1>
      <h1>View page id &nbsp; &nbsp; {props.match.params.id}</h1>
    </div>
  );
};

export default viewUser;
