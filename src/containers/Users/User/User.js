import React, { Component } from 'react';
import classes from './User.css';
import Aux from '../../../hoc/auxilliary';
import { withRouter } from 'react-router-dom';

class User extends Component {
  state = {
    selectedId: null,
  };

  selectedIdHandler = () => {
    const newId = this.props.helpId;
    this.setState({ selectedId: newId });
    this.props.history.push('/users/' + newId);
  };

  render() {
    return (
      <Aux>
        <div className={classes.User}>
          <div className={classes.UserInner}>
            <h4>
              <span>
                <i className='fas fa-user'></i>
              </span>
              &nbsp;&nbsp; Name :&nbsp;{this.props.name}
            </h4>
            <span>
              <i className='fas fa-mail-bulk'></i>&nbsp;&nbsp;Email : &nbsp;
              {this.props.email}
            </span>
            <span>
              <i className='fas fa-phone'></i>&nbsp;&nbsp;Phone : &nbsp;
              {this.props.phone}
            </span>
          </div>

          <div className={classes.UserInner2} onClick={this.selectedIdHandler}>
            <button className={classes.Btn}> View </button>
          </div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(User);
