import React, { Component } from "react";
import classes from "./Home.css";
import axios from "axios";
import VaccButton from "../../components/HomeControl/VaccButton/VaccButton";
import HomeControl from "../../components/HomeControl/HomeControl";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/auxilliary";

class Home extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
    this.text2 = React.createRef();
  }

  state = {
    children: [],
    childenTaken: [],
    childenNotTaken: [],
    VaccDone: true,
    VaccNotDone: false,
    count: null,
    loading: false,
    filterdTaken: null,
    filterdNotTaken: null,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://child-health-is.herokuapp.com/api/v1/children")
      .then((response) => {
        this.setState({
          loading: true,
          children: response.data.data,
          count: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  statusVaccination = (name) => {
    let taken = [];
    let finalTaken = [];
    let notTaken = [];
    let finalNotTaken = [];
    taken = this.state.children.map((child) => {
      let take = child.vaccination.map((vacc) => {
        return vacc.name === name && vacc.taken ? child : 0;
      });

      return take;
    });

    for (let i = 0; i < taken.length; i++) {
      for (let j = 0; j < taken[i].length; j++) {
        if (taken[i][j]) {
          finalTaken.push(taken[i][j]);
        }
      }
    }

    notTaken = this.state.children.map((child) => {
      let notTake = child.vaccination.map((vacc) => {
        return vacc.name === name && !vacc.taken ? child : 0;
      });

      return notTake;
    });

    for (let i = 0; i < notTaken.length; i++) {
      for (let j = 0; j < notTaken[i].length; j++) {
        if (notTaken[i][j]) {
          finalNotTaken.push(notTaken[i][j]);
        }
      }
    }
    console.log(finalTaken);
    console.log(finalNotTaken);

    this.setState({
      childenTaken: finalTaken,
      childenNotTaken: finalNotTaken,
    });
  };

  // componentDidUpdate() {
  //   console.log(this.state.childenTaken);
  // }

  // for first search a child that taken

  filtered = (input) => {
    let filter = this.state.childenTaken.filter((child) => {
      const regex = new RegExp(`${input}`, "gi");
      return child.user.name.match(regex) || child.user.phone.match(regex);
    });
    this.setState({ filterdTaken: filter });
  };

  changeSearchHandler = (e) => {
    if (this.text.current.value !== "") {
      this.filtered(e.target.value);
    } else {
      this.setState({ filterdTaken: null });
    }
  };

  // for first search a child that not taken

  filtered2 = (input) => {
    let filter = this.state.childenNotTaken.filter((child) => {
      const regex = new RegExp(`${input}`, "gi");
      return child.user.name.match(regex) || child.user.phone.match(regex);
    });
    this.setState({ filterdNotTaken: filter });
  };

  changeSearchHandler2 = (e) => {
    if (this.text2.current.value !== "") {
      this.filtered2(e.target.value);
    } else {
      this.setState({ filterdNotTaken: null });
    }
    console.log(this.state.filterdNotTaken);
  };

  render() {
    let vaccButton = null;
    if (this.state.children[0]) {
      let childVacc = this.state.children[0].vaccination;
      vaccButton = childVacc.map((vacc, index) => {
        return (
          <VaccButton
            key={index}
            vaccName={vacc.name}
            clicked={() => this.statusVaccination(vacc.name)}
          />
        );
      });
    }

    return (
      <Aux>
        {this.state.loading ? (
          <div className={classes.Container}>
            <div className={classes.VaccContainer}>
              <h1>تقرير التطعيمات</h1>
              <div className={classes.VaccButtonContainer}>{vaccButton}</div>
            </div>

            <div className={classes.TakenContainer}>
              <h3>الأطفال الحصلين علي التطعيم</h3>
              <div className={classes.TakenContent}>
                <div className={classes.SearchContainer}>
                  <input
                    ref={this.text}
                    type="text"
                    placeholder="Search"
                    onChange={this.changeSearchHandler}
                  />
                </div>

                {this.state.filterdTaken !== null ? (
                  <HomeControl
                    showChild={this.state.filterdTaken}
                    isDone={this.state.VaccDone}
                  />
                ) : (
                  <HomeControl
                    showChild={this.state.childenTaken}
                    isDone={this.state.VaccDone}
                  />
                )}
              </div>
            </div>

            <div className={classes.NotTakenContainer}>
              <h3>الأطفال الذين لم يأخذوا التطعيم</h3>
              <div className={classes.TakenContent}>
                <div className={classes.SearchContainer}>
                  <input
                    ref={this.text2}
                    type="text"
                    placeholder="Search"
                    onChange={this.changeSearchHandler2}
                  />
                </div>

                <Aux>
                  {this.state.filterdNotTaken !== null ? (
                    <HomeControl
                      showChild={this.state.filterdNotTaken}
                      isDone={this.state.VaccNotDone}
                    />
                  ) : (
                    <HomeControl
                      showChild={this.state.childenNotTaken}
                      isDone={this.state.VaccNotDone}
                    />
                  )}
                </Aux>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

export default Home;
