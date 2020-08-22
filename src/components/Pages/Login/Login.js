import React, { Component } from 'react';
import classes from './Login.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';

class Login extends Component {
  state = {
    login: {
      email: '',
      password: '',
    },
    normalUser: false,
    errors: {
      isError: false,
      inValid: 'invalid user name or password',
    },
    showModalUser: false,
  };

  changeHandler = (e) => {
    let input = this.state.login;
    input[e.target.name] = e.target.value;
    this.setState({ login: input });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post('http://localhost:5000/api/v1/auth/login', this.state.login, config)
      .then((response) => {
        // localStorage.setItem('token', response.data.token);
        if (response.data.token) {
          axios.defaults.headers.common['x-auth-token'] = response.data.token;
          axios
            .get('http://localhost:5000/api/v1/auth/me')
            .then((res) => {
              console.log(res);
              console.log(res.data.data.role);
              if (res.data.data.role === 'admin') {
                localStorage.setItem('auth', res.data.data.role);
                this.props.history.push('/');
                window.location.reload(false);
              }
              if (res.data.data.role === 'user') {
                this.setState({ normalUser: true, showModalUser: true });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          delete axios.defaults.headers.common['x-auth-token'];
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: {
            isError: true,
            inValid: 'invalid user name or password',
          },
        });
        console.log(this.state.errors);
      });
  };

  showModalUserHandler = (e) => {
    e.preventDefault();
    this.setState({ showModalUser: !this.state.showModalUser });
  };

  render() {
    return (
      <div>
        <section id={classes.Login}>
          <div id={classes.Login_grid}>
            <div className={classes.Logo_img}>
              <img
                src={require('../../../assets/images/medical_research2.svg')}
                alt='Medical '
              />
            </div>
            <div className={classes.Form_wrap}>
              <img
                src={require('../../../assets/images/avatar.svg')}
                alt='avatar'
              />
              <h2>مرحباً</h2>
              <form onSubmit={this.submitHandler}>
                <div className={classes.Form_group}>
                  <label htmlFor='email'>البريد الإلكتروني</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='ادخل البريد الإلكتروني'
                    onChange={this.changeHandler}
                    required
                  />
                </div>
                <div className={classes.Form_group}>
                  <label htmlFor='password'>الرقم السري</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='الرقم السري'
                    onChange={this.changeHandler}
                    minLength='6'
                    required
                  />
                  <div className={classes.inValid}>
                    {this.state.errors.isError ? (
                      <p>{this.state.errors.inValid}</p>
                    ) : null}
                  </div>
                </div>

                <div className={classes.Form_group}>
                  <button type='submit' className={classes.Btn_login}>
                    تسجيل الدخول
                  </button>
                </div>
                <p>
                  عند الضغط علي تسجل الدخول، سوف تذهب الي&nbsp;
                  <a href='/'>صفحة لوحة التحكم</a>
                </p>
              </form>
            </div>
          </div>
        </section>
        <Backdrop
          show={this.state.showModalUser}
          clicked={this.showModalUserHandler}
        />
        <Modal show={this.state.showModalUser}>
          <div className={classes.UserRouteContainer}>
            <p>... صفحة المستخدم تحت إلانشاء الان</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Login);
