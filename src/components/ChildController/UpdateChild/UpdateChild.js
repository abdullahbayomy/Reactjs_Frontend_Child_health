import React, { Component } from 'react';
import classes from './UpdateChild.css';

class UpdateChild extends Component {
  state = {
    male: 'ذكر',
    female: 'انثي',
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.submitted}
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
                value={this.props.child.childName}
                onChange={this.props.changed}
              />
            </div>
            <div className={classes.Form_group}>
              <label htmlFor='childGender'>Child gender</label>
              <select
                name='childGender'
                value={this.props.child.childGender}
                onChange={this.props.changed}
              >
                <option value={this.state.male}>ذكر</option>
                <option value={this.state.female}>انثي</option>
              </select>
            </div>
            <div className={classes.Form_group}>
              <label htmlFor='registerNumber'>Register number</label>
              <input
                type='text'
                placeholder='Register number'
                name='registerNumber'
                value={this.props.child.registerNumber}
                onChange={this.props.changed}
              />
            </div>
            <div className={classes.Form_group}>
              <label htmlFor='birthPlace'>Birth place</label>
              <input
                type='text'
                placeholder='Birth place'
                name='birthPlace'
                value={this.props.child.birthPlace}
                onChange={this.props.changed}
              />
            </div>
            <div className={classes.Form_group}>
              <label htmlFor='registerDate'>Register Date</label>
              <input
                name='registerDate'
                type='date'
                value={this.props.child.registerDate}
                onChange={this.props.changed}
              />
            </div>
            <div className={classes.Form_group}>
              <label htmlFor='birthDate'>Birth date</label>
              <input
                name='birthDate'
                type='date'
                value={this.props.child.birthDate}
                onChange={this.props.changed}
              />
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
      </div>
    );
  }
}

export default UpdateChild;
