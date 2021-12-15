import React, { Component } from "react";
import axios from "axios";
import classes from "./Children.css";
import Aux from "../../hoc/auxilliary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ChildControl from "../../components/ChildController/ChildControl";

class Children extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  state = {
    children: [],
    count: null,
    loading: false,
    filterdUser: null,
  };
  componentDidMount() {
    axios
      .get("https://child-health-is.herokuapp.com/api/v1/children")
      .then((response) => {
        // console.log(response);
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

  filtered = (input) => {
    let filter = this.state.children.filter((child) => {
      const regex = new RegExp(`${input}`, "gi");
      return child.user.name.match(regex) || child.user.phone.match(regex);
    });
    this.setState({ filterdUser: filter });
  };

  changeSearchHandler = (e) => {
    if (this.text.current.value !== "") {
      this.filtered(e.target.value);
      // console.log(this.state.filterdUser);
    } else {
      this.setState({ filterdUser: null });
    }
  };
  render() {
    let mainContent = null;
    if (this.state.loading) {
      mainContent = (
        <Aux>
          <div className={classes.Container}>
            <div className={classes.Count}>
              <label>
                {this.state.count}
                &nbsp;: الكل الأطفال&nbsp;<i className="fas fa-baby fa-2x"></i>
              </label>
            </div>
          </div>
          <div className={classes.SearchContainer}>
            <input
              ref={this.text}
              type="text"
              placeholder="Search"
              onChange={this.changeSearchHandler}
            />
          </div>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "1rem",
              color: "#0c2854",
            }}
          >
            قائمة الاطفال
          </h1>
        </Aux>
      );
    }

    return (
      <div className={classes.Children}>
        {mainContent}

        {this.state.loading ? (
          <Aux>
            {this.state.filterdUser !== null ? (
              <ChildControl children={this.state.filterdUser} />
            ) : (
              <ChildControl children={this.state.children} />
            )}
          </Aux>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Children;
