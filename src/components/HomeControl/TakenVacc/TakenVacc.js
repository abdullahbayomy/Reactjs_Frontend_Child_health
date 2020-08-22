import React, { Component } from 'react';
import classes from './TakenVacc.css';
import { withRouter } from 'react-router-dom';

class TakenVacc extends Component {
  state = {
    selectedId: null,
    disabled: true,
  };

  handleClick = () => {
    this.setState({ disabled: true });
  };

  selectedIdHandler = () => {
    const newId = this.props.helpId;
    this.setState({ selectedId: newId });
    this.props.history.push(`/children/${newId}`);
  };
  render() {
    return (
      <div className={classes.Container}>
        <div>
          <span>
            &nbsp; أسم الأم :&nbsp;&nbsp;{this.props.motherName} &nbsp;&nbsp;
            <span>
              <i className='fas fa-user'></i>
            </span>
          </span>
        </div>
        <div>
          <span>
            &nbsp; اسم الطفل :&nbsp;&nbsp; {this.props.name} &nbsp;&nbsp;
            <i className='fas fa-child'></i>
          </span>
        </div>

        <div>
          <span>
            {this.props.phone} &nbsp;: الهاتف &nbsp;&nbsp;
            <i className='fas fa-phone'></i>
          </span>
        </div>
        <div>
          <span>
            <input
              type='checkbox'
              checked={this.props.done}
              onClick={this.handleClick}
              disabled={this.state.disabled}
            />
            :أخذ التطعيم
          </span>
        </div>
        <div>
          <button onClick={this.selectedIdHandler}>عرض</button>
        </div>
      </div>
    );
  }
}

export default withRouter(TakenVacc);
