import React, { Component } from "react";
import classes from "./ViewUser.css";
import axios from "axios";
import Aux from "../../../hoc/auxilliary";
import Spinner from "../../UI/Spinner/Spinner";
import ChildControl from "../../ChildController/ChildControl";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import UpdateUser from "../UpdateUser/UpdateUser";
import DeleteUser from "../DeleteUser/DeleteUser";

class ViewUser extends Component {
  state = {
    children: [],
    user: null,
    userLoading: false,
    childLoading: false,
    showDelte: false,
    showUpdate: false,
    loadUpdate: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://child-health-is.herokuapp.com/api/v1/auth/users/${this.props.match.params.id}`
      )
      .then((response) =>
        this.setState({
          userLoading: true,
          user: response.data.data,
        })
      )
      .catch((error) => console.log(error));

    axios
      .get(
        `https://child-health-is.herokuapp.com/api/v1/auth/users/${this.props.match.params.id}/children`
      )
      .then((response) => {
        this.setState({ childLoading: true, children: response.data.data });
      })
      .catch((error) => console.log(error));
  }

  showDeleteChild = () => {
    this.setState({ showDelte: !this.state.showDelte });
  };

  showUpdateUser = () => {
    this.setState({ showUpdate: !this.state.showUpdate });
  };

  render() {
    let person = <Spinner />;
    if (this.state.userLoading) {
      person = (
        <div className={classes.ViewUser}>
          <div className={classes.ViewUserInner2}>
            <span>
              {this.state.user.address}&nbsp;: العنوان&nbsp;&nbsp;
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>
              {this.state.user.createdAt.split("T")[0]}&nbsp;: وقت
              الانشاء&nbsp;&nbsp;<i className="fas fa-address-card"></i>
            </span>
            <button className={classes.Btn} onClick={this.showDeleteChild}>
              {" "}
              حذف الحساب
            </button>
          </div>

          <div className={classes.ViewUserInner}>
            <h4>
              &nbsp; أسم المستخدم :&nbsp;&nbsp;{this.state.user.name}
              &nbsp;&nbsp;
              <span>
                <i className="fas fa-user"></i>
              </span>
            </h4>
            <span>
              {this.state.user.email}&nbsp;: البريد الإلكتروني &nbsp;&nbsp;
              <i className="fas fa-mail-bulk"></i>
            </span>
            <span>
              {this.state.user.phone} &nbsp;: الهاتف &nbsp;&nbsp;
              <i className="fas fa-phone"></i>
            </span>

            <button className={classes.Btn} onClick={this.showUpdateUser}>
              {" "}
              تعديل{" "}
            </button>
          </div>
        </div>
      );
    }

    let children = <Spinner />;
    if (this.state.childLoading) {
      if (this.state.children.length) {
        children = (
          <Aux>
            <div className={classes.Children}>
              <div>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    color: "#0c2854",
                  }}
                >
                  الأطفال الخاصه بالمستخدم
                </h1>
                <ChildControl children={this.state.children} />
              </div>
            </div>
          </Aux>
        );
      } else {
        children = (
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "5rem",
              color: "#0c2854",
            }}
          >
            ... لا يوجد اطفال لهذا المستخدم
          </h1>
        );
      }
    }
    return (
      <Aux>
        {person}
        {this.state.userLoading ? (
          <Aux>
            {" "}
            <Backdrop
              show={this.state.showUpdate}
              clicked={this.showUpdateUser}
            />
            <Modal show={this.state.showUpdate}>
              <UpdateUser
                show={this.state.showUpdate}
                cancel={this.showUpdateUser}
                user={this.state.user}
              />
            </Modal>
          </Aux>
        ) : null}
        <Backdrop show={this.state.showDelte} clicked={this.showDeleteChild} />
        <Modal show={this.state.showDelte}>
          <DeleteUser
            show={this.state.showDelte}
            clicked={this.showDeleteChild}
          />
        </Modal>
        {children}
      </Aux>
    );
  }
}

export default ViewUser;
