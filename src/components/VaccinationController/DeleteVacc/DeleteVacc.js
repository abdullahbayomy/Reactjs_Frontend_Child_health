import React, { Component } from "react";
import classes from "./DeleteVacc.css";
import axios from "axios";

class DeleteVacc extends Component {
  deleteVaccHandler = () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    let removeVacc = {
      name: this.props.name,
      nameArabic: this.props.nameArabic,
      date: this.props.date,
      description: this.props.description,
      benefits: this.props.benefits,
      harm: this.props.harm,
      additionalVacc: this.props.additionalVacc,
      taken: this.props.taken,
    };
    console.log(removeVacc);
    axios
      .put(
        `https://child-health-is.herokuapp.com/api/v1/children/remove`,
        removeVacc,
        config
      )
      .then((response) => {
        console.log(response);
        window.location.reload(false);
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
            <button className={classes.Btn} onClick={this.deleteVaccHandler}>
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

export default DeleteVacc;
