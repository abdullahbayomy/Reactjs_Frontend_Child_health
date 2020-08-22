import React, { Component } from 'react';
import classes from './DeleteUser.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class DeleteUser extends Component {
  deleteUserHandler = () => {
    axios
      .delete(
        `http://localhost:5000/api/v1/auth/users/${this.props.match.params.id}`
      )
      .then((response) => {
        this.props.history.replace('/users');
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div
        style={{
          display: this.props.show ? 'block' : 'none',
        }}
      >
        <div className={classes.Container}>
          <h3>هل تريد حذف المستخدم ؟</h3>

          <div>
            <button className={classes.Btn} onClick={this.deleteUserHandler}>
              حذف
            </button>
          </div>
          <div className={classes.RedBtn}>
            <button className={classes.Btn} onClick={this.props.clicked}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DeleteUser);
