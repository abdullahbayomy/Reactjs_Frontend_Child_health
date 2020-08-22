import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import Calendar from 'react-calendar';
import classes from './CreateChild.css';

class CreateChild extends Component {
  state = {
    male: 'ذكر',
    female: 'انثي',
  };
  render() {
    return (
      <form
        onSubmit={this.props.clicked}
        style={{
          display: this.props.show ? 'block' : 'none',
        }}
      >
        <div className={classes.Form_wrap}>
          <h1>Create New Child</h1>
          <div className={classes.Form_group}>
            <label htmlFor='childName'>Child name</label>
            <input
              type='text'
              placeholder='Child name'
              name='childName'
              value={this.props.contact.childName}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.childName}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='childGender'>Child gender</label>
            <select
              name='childGender'
              value={this.props.contact.childGender}
              onChange={this.props.changed}
            >
              <option value={this.state.male}>ذكر</option>
              <option value={this.state.female}>انثي</option>
            </select>

            <div style={{ color: 'red' }}>{this.props.errors.childGender}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='registerNumber'>Register number</label>
            <input
              type='text'
              placeholder='Register number'
              name='registerNumber'
              value={this.props.contact.registerNumber}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>
              {this.props.errors.registerNumber}
            </div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='birthPlace'>Birth place</label>
            <input
              type='text'
              placeholder='Birth place'
              name='birthPlace'
              value={this.props.contact.birthPlace}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.birthPlace}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='registerDate'>Register Date</label>
            <input
              name='registerDate'
              type='date'
              value={this.props.contact.registerDate}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.registerDate}</div>
          </div>
          <div className={classes.Form_group}>
            <label htmlFor='birthDate'>Birth date</label>
            <input
              name='birthDate'
              type='date'
              value={this.props.contact.birthDate}
              onChange={this.props.changed}
            />
            <div style={{ color: 'red' }}>{this.props.errors.birthDate}</div>
          </div>
        </div>

        {/* <button type='submit'>Submit</button>
        <button onClick={this.props.cancel}>Cancel</button> */}
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

export default CreateChild;
