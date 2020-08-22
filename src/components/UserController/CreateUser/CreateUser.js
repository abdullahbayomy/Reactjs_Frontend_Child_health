import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './CreateUser.css';

class CreateUser extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.clicked}
        style={{
          display: this.props.show ? 'block' : 'none',
        }}
      >
        <div className={classes.Form_wrap}>
          <h1>Create New User</h1>
          <div className={classes.Form_group}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={this.props.contact.name}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.name}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={this.props.contact.email}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.email}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='phone'>Phone</label>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              value={this.props.contact.phone}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.phone}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              placeholder='Address'
              name='address'
              value={this.props.contact.address}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.address}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.props.contact.password}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.password}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              placeholder='confirm Password'
              name='password2'
              value={this.props.contact.password2}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.password2}</div>
          </div>
          <div className={classes.Form_radio}>
            <h5>Role : </h5>
            <div>
              <input
                type='radio'
                name='role'
                value='user'
                checked={this.props.contact.role === 'user'}
                onChange={this.props.changed}
              />{' '}
              User{' '}
            </div>
            <div>
              <input
                type='radio'
                name='role'
                value='admin'
                checked={this.props.contact.role === 'admin'}
                onChange={this.props.changed}
              />{' '}
              Admin
            </div>
          </div>
        </div>
        <div className={classes.ContainerBtn}>
          <div>
            <button className={classes.Btn} type='submit'>
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

export default withRouter(CreateUser);
