import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classes from "./UpdateStatus.css";

class UpdateStatus extends Component {
  state = {
    taken: false,
    childData: {
      vaccination: [{}],
    },
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeState = () => {
    this.setState({ taken: !this.state.taken });
  };

  submitHandler = (e) => {
    let vacc = this.props.allVaccination[this.props.index];

    vacc.taken = this.state.taken;

    this.props.allVaccination[this.props.index] = vacc;

    let allVacc = { ...this.state.childData };
    allVacc.vaccination = this.props.allVaccination;

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        `https://child-health-is.herokuapp.com/api/v1/children/${this.props.match.params.id}`,
        allVacc,
        config
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <form
        style={{
          display: this.props.show ? "block" : "none",
        }}
      >
        <div className={classes.Form_wrap}>
          <h1>Update Status</h1>

          <div className={classes.Form_group}>
            <label htmlFor="checked">update status of vaccination</label>
            <input
              type="checkbox"
              name="checked"
              checked={this.state.taken}
              onChange={this.changeHandler}
              onClick={this.changeState}
            />
          </div>
        </div>
        <div className={classes.ContainerBtn}>
          <div>
            <button
              type="submit"
              className={classes.Btn}
              onClick={this.submitHandler}
            >
              Submit
            </button>
          </div>
          <div className={classes.RedBtn}>
            <button className={classes.Btn} onClick={this.props.cancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(UpdateStatus);
