import React, { Component } from 'react';
import classes from './VaccChild.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Modal from '../../../UI/Modal/Modal';
import UpdateStatus from '../UpdateStatus/UpdateStatus';

class VaccChild extends Component {
  state = {
    disabled: true,

    showUpdateStatus: false,
  };

  handleClick = () => {
    this.setState({ disabled: true });
  };

  showUpdateStatusHandler = (e) => {
    e.preventDefault();
    this.setState({ showUpdateStatus: !this.state.showUpdateStatus });
  };
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Vaccination}>
          <div>
            <span>
              <span className={classes.UniqueSpan}>اسم التطعيم :</span>
              &nbsp;{this.props.name}&nbsp;&nbsp;
              <i className='fas fa-notes-medical fa-2x'></i>
            </span>
            <span>
              معاد التطعيم :&nbsp;{this.props.date}&nbsp;&nbsp;{' '}
              <i className='far fa-clock'></i>
            </span>
            <span>
              الوصف :&nbsp;{this.props.disc}&nbsp;&nbsp;
              <i className='fas fa-comment-medical'></i>
            </span>
            <span>
              الفوائد :&nbsp;{this.props.benefits} &nbsp;&nbsp;
              <i className='fas fa-hand-holding-medical'></i>
            </span>
            <span>
              الاضرار :&nbsp;{this.props.harm}&nbsp;&nbsp;
              <i className='fas fa-lungs-virus'></i>
            </span>
            <span>
              تطعيم اضافي :&nbsp;{this.props.additionalVacc}&nbsp;&nbsp;
              <i className='fas fa-syringe '></i>
            </span>

            <span>
              <input
                type='checkbox'
                checked={this.props.taken}
                onClick={this.handleClick}
                disabled={this.state.disabled}
              />
              :أخذ التطعيم
            </span>
          </div>
          <div>
            <button
              className={classes.Btn}
              onClick={this.showUpdateStatusHandler}
            >
              تعديل الحاله
            </button>
          </div>
        </div>
        <Backdrop
          show={this.state.showUpdateStatus}
          clicked={this.showUpdateStatusHandler}
        />
        <Modal show={this.state.showUpdateStatus}>
          <UpdateStatus
            show={this.state.showUpdateStatus}
            cancel={this.showUpdateStatusHandler}
            take={this.props.taken}
            index={this.props.ind}
            allVaccination={this.props.allVacc}
          />
        </Modal>
      </div>
    );
  }
}

export default VaccChild;
