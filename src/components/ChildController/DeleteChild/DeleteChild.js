import React, { Component } from "react";
import classes from "./DeleteChild.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

class DeleteChild extends Component {
  deleteChildHandler = () => {
    axios
      .delete(
        `https://child-health-is.herokuapp.com/api/v1/auth/users/${this.props.idUser}/children/${this.props.match.params.id}`
      )
      .then((response) => {
        console.log(response);
        this.props.history.push("/children");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div
        style={{
          display: this.props.show ? "block" : "none",
        }}
      >
        <div className={classes.Container}>
          <h3>هل تريد حذف التطعيم ؟</h3>

          <div>
            <button className={classes.Btn} onClick={this.deleteChildHandler}>
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

export default withRouter(DeleteChild);
