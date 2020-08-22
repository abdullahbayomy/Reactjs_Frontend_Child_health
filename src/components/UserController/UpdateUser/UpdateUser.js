import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/auxilliary';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

class UpdateUser extends Component {
  state = {
    checked: true,
    currentUser: null,
    password: '',
    loadUser: false,
    loadSpinnerUpdate: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    if (!this.state.currentUser && !this.state.loadUser) {
      setTimeout(() => {
        let password = this.state.password;
        let user = { ...this.props.user, password };
        this.setState({ currentUser: user, loadUser: true });
        console.log(this.state.currentUser);
      }, 1000);
    }
  }

  switchCheckHandler = () => {
    this.setState({ checked: !this.state.checked });
  };

  changeHandler = (e) => {
    let input = this.state.currentUser;
    input[e.target.name] = e.target.value;
    this.setState({ currentUser: input });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.setState({ loadSpinnerUpdate: true });

    let userData = null;
    userData = {
      name: this.state.currentUser.name,
      email: this.state.currentUser.email,
      address: this.state.currentUser.address,
      phone: this.state.currentUser.phone,
    };
    if (!this.state.currentUser.password) {
      userData = { ...userData };
      console.log(userData);
    } else {
      userData = { ...this.state.currentUser };
      console.log(userData);
    }

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .put(
        `http://localhost:5000/api/v1/auth/users/${this.props.match.params.id}`,
        userData,
        config
      )
      .then((response) => {
        console.log(response);
        this.setState({ loadSpinnerUpdate: false, loadUser: false });
        this.props.history.go(`/users/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadSpinnerUpdate: false, loadUser: false });
      });
  };

  render() {
    let updatedForm = null;

    if (this.state.loadUser) {
      updatedForm = (
        <Aux>
          <form
            style={{
              display: this.props.show ? 'block' : 'none',
            }}
          >
            <h1>Update User</h1>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={this.state.currentUser.name}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={this.state.currentUser.email}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={this.state.currentUser.phone}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                placeholder='Address'
                name='address'
                value={this.state.currentUser.address}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div>
              <input
                type='checkbox'
                name='checkpassword'
                onClick={this.switchCheckHandler}
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Password'
                name='password'
                disabled={this.state.checked}
                value={this.state.currentUser.password}
                onChange={this.changeHandler}
                required
              />
            </div>

            <button type='submit' onClick={this.submitHandler}>
              Submit
            </button>
            <button onClick={this.props.cancel}>Cancel</button>
          </form>
        </Aux>
      );
    } else {
      updatedForm = null;
    }

    if (this.state.loadSpinnerUpdate) {
      updatedForm = <Spinner />;
    }

    return <Aux>{updatedForm}</Aux>;
  }
}

export default withRouter(UpdateUser);
