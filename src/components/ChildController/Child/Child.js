import React, { Component } from "react";
import classes from "./Child.css";
import Aux from "../../../hoc/auxilliary";
import { withRouter } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
// import Spinner from '../../UI/Spinner/Spinner';
import VaccChild from "../ViewChild/VaccChild/VaccChild";
import axios from "axios";

class Child extends Component {
  state = {
    child: null,
    selectedId: null,
    loading: false,
    showVacc: false,
  };

  selectedIdHandler = () => {
    const newId = this.props.helpId;
    this.setState({ selectedId: newId });
    this.props.history.push(`/children/${newId}`);
  };

  // View vaccination

  showVaccHandler = () => {
    this.setState({ showVacc: !this.state.showVacc });
    axios
      .get(
        `https://child-health-is.herokuapp.com/api/v1/children/${this.props.helpId}`
      )
      .then((response) => {
        // console.log(response.data.data);
        this.setState({ child: response.data.data, loading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let taken = 0;
    let notTaken = 0;
    let hasTaken = this.props.vaccination.map((vacc) => {
      return vacc.taken;
    });

    for (let i = 0; i < hasTaken.length; i++) {
      if (hasTaken[i]) {
        taken++;
      } else {
        notTaken++;
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
          />
        );
      });
    }

    return (
      <Aux>
        <div className={classes.Children}>
          <div className={classes.ChildrenInner2}>
            <span>
              {hasTaken.length} &nbsp;&nbsp;: كل التطعيمات &nbsp;
              <i className="fas fa-user-md"></i>
            </span>
            <span>
              {taken}&nbsp;&nbsp;: التطعيمات المأخوذة &nbsp;
              <i className="fas fa-syringe"></i>
            </span>
            <span>
              {notTaken}&nbsp;&nbsp;: التطعيمات المتبقية &nbsp;
              <i className="fas fa-notes-medical"></i>
            </span>
            {/* <button className={classes.Btn} onClick={this.showVaccHandler}>
              {' '}
              عرض التطعيمات{' '}
            </button> */}
            <button className={classes.Btn} onClick={this.selectedIdHandler}>
              {" "}
              عرض الكل{" "}
            </button>
          </div>

          <div className={classes.ChildrenInner}>
            <h4>
              <span>
                &nbsp; اسم الطفل :&nbsp;&nbsp;{this.props.name}
                &nbsp;&nbsp;<i className="fas fa-child"></i>
              </span>
            </h4>
            <span>
              {this.props.date} &nbsp;&nbsp;: تاريخ الميلاد &nbsp;
              <i className="fas fa-birthday-cake"></i>
            </span>
            <span>
              &nbsp; محل الميلاد :&nbsp;&nbsp;{this.props.place}
              &nbsp;&nbsp;<i className="fas fa-map-marker-alt"></i>
            </span>
          </div>
        </div>
        <Backdrop show={this.state.showVacc} clicked={this.showVaccHandler} />
        <Modal show={this.state.showVacc}>
          {/* <UpdateStatus
            show={this.state.showVacc}
            cancel={this.showVaccHandler}
          /> */}
          {vacc}
        </Modal>
      </Aux>
    );
  }
}

export default withRouter(Child);
