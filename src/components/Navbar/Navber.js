import React, { Component } from 'react';
import Aux from '../../hoc/auxilliary';
import classes from './Navbar.css';
import { NavLink, withRouter } from 'react-router-dom';
import GetToken from '../Pages/GetToken/GetToken';

class Navbar extends Component {
  logoutHandler = () => {
    localStorage.removeItem('auth');
    this.props.history.push('/login');
  };

  render() {
    let showLogin = GetToken();
    let show = null;
    if (showLogin) {
      show = (
        <Aux>
          <div className={classes.Navbar}>
            <h1 onClick={this.props.show}>
              <i className='fab fa-medrt'></i> Health Care {'   '}
              <i className='fas fa-sort-down'></i>
            </h1>

            <ul>
              <li>
                <NavLink to='/' exact activeClassName={classes.HomeLink}>
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li>
                <a onClick={this.logoutHandler}>
                  خروج <i className='fas fa-sign-in-alt'></i>
                </a>
              </li>
            </ul>
          </div>
        </Aux>
      );
    } else {
      show = (
        <Aux>
          <div className={classes.Navbar}>
            <h1>
              <i className='fab fa-medrt'></i> Health Care {'   '}
              <i className='fas fa-sort-down'></i>
            </h1>

            <ul>
              <li></li>
              <li>
                <NavLink to='/login'>
                  <i className='fas fa-sign-in-alt'></i> تسجيل الدخول
                </NavLink>
              </li>
            </ul>
          </div>
        </Aux>
      );
    }
    return <Aux>{show}</Aux>;
  }
}

export default withRouter(Navbar);
