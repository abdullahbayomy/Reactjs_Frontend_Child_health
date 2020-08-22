import React, { Component } from 'react';
import axios from 'axios';
import classes from './Users.css';
import Aux from '../../hoc/auxilliary';
import Spinner from '../.././components/UI/Spinner/Spinner';
import UserControl from '../../components/UserController/UserControl';
import CreateUser from '../../components/UserController/CreateUser/CreateUser';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import ValidateFormUser from '../../hoc/ValidateFormUser';

class Users extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  state = {
    persons: [],
    count: null,
    loading: false,
    loadCreate: false,
    showModal: false,
    modalChild: false,
    contact: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      password2: '',
      role: 'user',
    },
    errors: {},
    filterdUser: null,
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/v1/auth/users')
      .then((response) => {
        this.setState({
          loading: true,
          persons: response.data.data,
          count: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showCreateUser = (e) => {
    e.preventDefault();
    this.setState({ showModal: !this.state.showModal });
  };
  showCreateChild = (e) => {
    e.preventDefault();
    this.setState({ modalChild: !this.state.modalChild });
  };

  // for create user
  changeHandler = (e) => {
    let input = this.state.contact;
    input[e.target.name] = e.target.value;
    this.setState({ contact: input });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const { isValid, errors } = ValidateFormUser(this.state.contact);
    if (isValid) {
      this.setState({ loadCreate: true });
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      let newUser = {
        ...this.state.contact,
      };
      axios
        .post('http://localhost:5000/api/v1/auth/users', newUser, config)
        .then((response) => {
          console.log(response);
          this.setState({ loadCreate: false, showModal: false });
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loadCreate: false, showModal: false });
        });
      let input = {};
      input['name'] = '';
      input['email'] = '';
      input['phone'] = '';
      input['address'] = '';
      input['password'] = '';
      input['password2'] = '';
      input['role'] = 'user';
      this.setState({ contact: input });
    }
    this.setState({ errors });
  };

  filtered = (input) => {
    let filter = this.state.persons.filter((user) => {
      const regex = new RegExp(`${input}`, 'gi');
      return user.name.match(regex) || user.phone.match(regex);
    });
    this.setState({ filterdUser: filter });
  };

  changeSearchHandler = (e) => {
    if (this.text.current.value !== '') {
      this.filtered(e.target.value);
      console.log(this.state.filterdUser);
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
              {this.state.count}
              <label>
                &nbsp;: الكل &nbsp;<i className='fas fa-users'></i>
              </label>
            </div>
          </div>

          <div className={classes.CreateUser}>
            <button onClick={this.showCreateUser}>
              مستخدم&nbsp;<i className='fas fa-user-plus'></i>
            </button>
          </div>
          <div className={classes.SearchContainer}>
            <input
              ref={this.text}
              type='text'
              placeholder='Search'
              onChange={this.changeSearchHandler}
            />
          </div>
          <h1
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: '1rem',
              color: '#0c2854',
            }}
          >
            قائمة المستخدمين
          </h1>
        </Aux>
      );
    }

    let createUser = (
      <CreateUser
        cancel={this.showCreateUser}
        show={this.state.showModal}
        clicked={(event) => this.submitHandler(event)}
        changed={(event) => this.changeHandler(event)}
        contact={this.state.contact}
        errors={this.state.errors}
      />
    );
    if (this.state.loadCreate) {
      createUser = <Spinner />;
    }

    return (
      <div className={classes.Users}>
        {mainContent}
        <Backdrop show={this.state.showModal} clicked={this.showCreateUser} />
        <Modal show={this.state.showModal}>{createUser}</Modal>
        {this.state.loading ? (
          <Aux>
            {this.state.filterdUser !== null ? (
              <UserControl
                persons={this.state.filterdUser}
                clickToShow={this.showCreateChild}
              />
            ) : (
              <UserControl
                persons={this.state.persons}
                clickToShow={this.showCreateChild}
              />
            )}
          </Aux>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Users;
