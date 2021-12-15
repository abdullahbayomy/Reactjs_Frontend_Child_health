import React, { Component } from "react";
import classes from "./User.css";
import Aux from "../../../hoc/auxilliary";
import { withRouter } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import CreateChild from "../../ChildController/CreateChild/CreateChild";
import ValidateFormChild from "./ValidateFormChild";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";

class User extends Component {
  state = {
    selectedId: null,
    modalChild: false,
    loadCreate: false,
    contact: {
      childName: "",
      childGender: "ذكر",
      registerNumber: "",
      registerDate: "",
      birthDate: "",
      birthPlace: "",
    },
    errors: {},
  };

  showCreateChild = (e) => {
    e.preventDefault();
    this.setState({ modalChild: !this.state.modalChild });
  };

  selectedIdHandler = () => {
    const newId = this.props.helpId;
    this.setState({ selectedId: newId });
    this.props.history.push("/users/" + newId);
  };

  changeHandler = (e) => {
    let input = this.state.contact;

    input[e.target.name] = e.target.value;
    this.setState({
      contact: input,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const { isValid, errors } = ValidateFormChild(this.state.contact);
    if (isValid) {
      const newId = this.props.helpId;
      this.setState({ loadCreate: true });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      let newUser = {
        ...this.state.contact,
      };

      axios
        .post(
          `https://child-health-is.herokuapp.com/api/v1/auth/users/${newId}/children`,
          newUser,
          config
        )
        .then((response) => {
          this.setState({ loadCreate: false, modalChild: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loadCreate: false, modalChild: false });
        });
      let input = {};
      input["childName"] = "";
      input["registerNumber"] = "";
      input["registerDate"] = "";
      input["birthDate"] = "";
      input["birthPlace"] = "";
      input["childGender"] = "ذكر";
      this.setState({ contact: input });
    }
    this.setState({ errors });
  };

  render() {
    let createChild = (
      <CreateChild
        cancel={this.showCreateChild}
        show={this.state.modalChild}
        clicked={(event) => this.submitHandler(event)}
        changed={(event) => this.changeHandler(event)}
        contact={this.state.contact}
        errors={this.state.errors}
      />
    );
    if (this.state.loadCreate) {
      createChild = <Spinner />;
    }
    return (
      <Aux>
        <div className={classes.User}>
          <div className={classes.UserInner2} onClick={this.selectedIdHandler}>
            <button className={classes.Btn}> عرض </button>
          </div>

          <div className={classes.UserInner}>
            <h4>
              الاسم :&nbsp;{this.props.name}
              &nbsp;&nbsp;
              <span>
                <i className="fas fa-user"></i>
              </span>
            </h4>
            <span>
              {this.props.email}
              &nbsp;&nbsp;: البريد الإلكتروني &nbsp;
              <i className="fas fa-mail-bulk"></i>
            </span>
            <span>
              {this.props.phone}
              &nbsp;&nbsp;: التليفون &nbsp;<i className="fas fa-phone"></i>
            </span>
            <div className={classes.UserInner}>
              <div onClick={this.showCreateChild}>
                <button className={classes.Btn} onClick={this.props.clicked}>
                  {" "}
                  اضافة طفل{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Backdrop show={this.state.modalChild} clicked={this.showCreateChild} />
        <Modal show={this.state.modalChild}>{createChild}</Modal>
      </Aux>
    );
  }
}

export default withRouter(User);
