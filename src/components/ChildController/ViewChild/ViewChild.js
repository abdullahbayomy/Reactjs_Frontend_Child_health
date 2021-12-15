import React, { Component } from "react";
import Aux from "../../../hoc/auxilliary";
import classes from "./ViewChild.css";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import VaccChild from "./VaccChild/VaccChild";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import DeleteChild from "../DeleteChild/DeleteChild";
import UpdateChild from "../UpdateChild/UpdateChild";

class ViewChild extends Component {
  state = {
    child: null,
    user: null,
    loading: false,
    showVacc: false,
    showDelte: false,
    showUpdate: false,
    loadSpinnerUpdate: false,
  };

  componentDidMount() {
    console.log(this.props.match.params.id);

    axios
      .get(
        `https://child-health-is.herokuapp.com/api/v1/children/${this.props.match.params.id}`
      )
      .then((response) => {
        console.log(response.data.data);
        this.setState({ child: response.data.data });

        axios
          .get(
            `https://child-health-is.herokuapp.com/api/v1/auth/users/${response.data.data.user}`
          )
          .then((response) => {
            console.log(response.data.data);
            this.setState({ user: response.data.data, loading: true });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showVaccHandler = () => {
    this.setState({ showVacc: true });
  };

  showDeleteChild = () => {
    this.setState({ showDelte: !this.state.showDelte });
  };

  showUpdateChild = () => {
    this.setState({ showUpdate: !this.state.showUpdate });
  };

  changeHandler = (e) => {
    let input = this.state.child;
    input[e.target.name] = e.target.value;
    this.setState({ child: input });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.setState({ loadSpinnerUpdate: true });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `https://child-health-is.herokuapp.com/api/v1/children/${this.props.match.params.id}`,
        this.state.child,
        config
      )
      .then((response) => {
        console.log(response);
        this.setState({ loadSpinnerUpdate: false, showUpdate: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadSpinnerUpdate: false, showUpdate: false });
      });
  };

  render() {
    let taken = 0;
    let notTaken = 0;
    let hasTaken = [];
    if (this.state.loading) {
      hasTaken = this.state.child.vaccination.map((vacc) => {
        return vacc.taken;
      });

      for (let i = 0; i < hasTaken.length; i++) {
        if (hasTaken[i]) {
          taken++;
        } else {
          notTaken++;
        }
      }
    }

    let vacc = null;
    if (this.state.loading) {
      vacc = this.state.child.vaccination.map((vacc, index) => {
        return (
          <VaccChild
            key={index}
            name={vacc.nameArabic}
            date={vacc.date}
            disc={vacc.description}
            benefits={vacc.benefits}
            harm={vacc.harm}
            additionalVacc={vacc.additionalVacc}
            taken={vacc.taken}
            ind={index}
            allVacc={this.state.child.vaccination}
          />
        );
      });
    }
    return (
      <Aux>
        {this.state.loading ? (
          <div className={classes.Container}>
            <div className={classes.ViewChild}>
              <div className={classes.ViewChildContent}>
                <div className={classes.ViewChildInner2}>
                  <span>
                    &nbsp; العنوان :&nbsp;&nbsp;{this.state.child.birthPlace}
                    &nbsp;&nbsp;
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <span>
                    {hasTaken.length}&nbsp;&nbsp;: كل التطعيمات &nbsp;
                    <i className="fas fa-user-md"></i>
                  </span>
                  <span>
                    {taken}&nbsp;&nbsp;: التطعيمات المأخوذة &nbsp;
                    <i className="fas fa-syringe"></i>
                  </span>
                  <span>
                    {notTaken} &nbsp;&nbsp;: التطعيمات المتبقية &nbsp;
                    <i className="fas fa-notes-medical"></i>
                  </span>
                  <button
                    className={classes.Btn}
                    onClick={this.showDeleteChild}
                  >
                    {" "}
                    حذف الطفل{" "}
                  </button>
                </div>

                <div className={classes.ViewChildInner}>
                  <span>
                    اسم الطفل :&nbsp;&nbsp;{this.state.child.childName}
                  </span>
                  <span>{this.state.child.birthDate}&nbsp;: تاريخ الميلاد</span>
                  <h4>
                    &nbsp; أسم الأم :&nbsp;&nbsp;{this.state.user.name}
                    &nbsp;&nbsp;
                    <span>
                      <i className="fas fa-user"></i>
                    </span>
                  </h4>
                  <span>
                    {this.state.user.phone} &nbsp;: الهاتف &nbsp;&nbsp;
                    <i className="fas fa-phone"></i>
                  </span>

                  <button
                    className={classes.Btn}
                    onClick={this.showUpdateChild}
                  >
                    {" "}
                    تعديل{" "}
                  </button>
                </div>
              </div>

              <div className={classes.VaccButton}>
                <button onClick={this.showVaccHandler}>تطعيمات الطفل</button>
              </div>
            </div>

            {this.state.showVacc ? (
              <Aux>
                <div>
                  <h3>التطعيمات الطفل</h3>
                </div>
                <div>{vacc}</div>
              </Aux>
            ) : null}
          </div>
        ) : (
          <Spinner />
        )}

        {this.state.loading ? (
          <Aux>
            {" "}
            <Backdrop
              show={this.state.showDelte}
              clicked={this.showDeleteChild}
            />
            <Modal show={this.state.showDelte}>
              <DeleteChild
                show={this.state.showDelte}
                clicked={this.showDeleteChild}
                idUser={this.state.user.id}
              />
            </Modal>{" "}
          </Aux>
        ) : null}

        {this.state.loading ? (
          <Aux>
            {" "}
            <Backdrop
              show={this.state.showUpdate}
              clicked={this.showUpdateChild}
            />
            <Modal show={this.state.showUpdate}>
              {this.state.loadSpinnerUpdate ? (
                <Spinner />
              ) : (
                <UpdateChild
                  show={this.state.showUpdate}
                  cancel={this.showUpdateChild}
                  child={this.state.child}
                  changed={this.changeHandler}
                  submitted={this.submitHandler}
                />
              )}
            </Modal>{" "}
          </Aux>
        ) : null}
      </Aux>
    );
  }
}

export default ViewChild;
