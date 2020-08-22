import React from 'react';
import classes from './SideBar.css';
import { Link } from 'react-router-dom';

const sideBar = (props) => {
  let attachedClasses = [classes.SideBar, classes.Close];

  if (props.showSideBar) {
    attachedClasses = [classes.SideBar, classes.Open];
  }

  return (
    <div className={attachedClasses.join(' ')}>
      <ul>
        <li>
          <Link to='/users' onClick={props.closeSide}>
            المستخدم &nbsp;<i className='fas fa-users-cog'></i>
          </Link>
        </li>
        <li>
          <Link to='/children' onClick={props.closeSide}>
            الأطفال &nbsp;<i className='fas fa-baby'></i>
          </Link>
        </li>
        <li>
          <Link to='/vaccination' onClick={props.closeSide}>
            التطعيمات &nbsp;<i className='fas fa-syringe '></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default sideBar;
