import React, { Component } from "react";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./UpdateVaccintion.css";

class UpdateVaccintion extends Component {
  state = {
    addVacc: {
      name: "",
      nameArabic: "",
      date: "",
      description: "",
      benefits: "",
      harm: "",
      additionalVacc: "",
      taken: false,
    },
    loadAddVacc: false,
  };

  changeHandler = (e) => {
    let input = this.state.addVacc;

    input[e.target.name] = e.target.value;
    this.setState({
      addVacc: input,
    });
  };

  submitHandler = (e) => {
    this.setState({ loadAddVacc: true });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `https://child-health-is.herokuapp.com/api/v1/children`,
        this.state.addVacc,
        config
      )
      .then((response) => {
        // console.log(response);
        this.setState({ loadAddVacc: false });
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadAddVacc: false });
      });
  };

  render() {
    return this.state.loadAddVacc ? (
      <Spinner />
    ) : (
      <form
        onSubmit={this.submitHandler}
        style={{
          display: this.props.show ? "block" : "none",
        }}
      >
        <div className={classes.Form_wrap}>
          <h1>Add New Vaccination</h1>
          <div className={classes.Form_group}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.addVacc.name}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="nameArabic">name arabic</label>
            <input
              type="text"
              placeholder="nameArabic"
              name="nameArabic"
              value={this.state.addVacc.nameArabic}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="date">time of vaccination</label>
            <input
              type="text"
              placeholder="time of vaccination"
              name="date"
              value={this.state.addVacc.date}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="description">description</label>
            <input
              type="text"
              placeholder="description"
              name="description"
              value={this.state.addVacc.description}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="benefits">benefits</label>
            <input
              type="text"
              placeholder="benefits"
              name="benefits"
              value={this.state.addVacc.benefits}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="harm">harm</label>
            <input
              type="text"
              placeholder="harm"
              name="harm"
              value={this.state.addVacc.harm}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className={classes.Form_group}>
            <label htmlFor="additionalVacc">additionalVacc</label>
            <input
              type="text"
              placeholder="additionalVacc"
              name="additionalVacc"
              value={this.state.addVacc.additionalVacc}
              onChange={this.changeHandler}
              required
            />
          </div>
        </div>

        <div className={classes.ContainerBtn}>
          <div>
            <button className={classes.Btn} type="submit">
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

export default UpdateVaccintion;
