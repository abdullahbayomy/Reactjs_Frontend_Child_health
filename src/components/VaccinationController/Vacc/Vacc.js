import React, { Component } from 'react';
import classes from './Vacc.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import DeleteVacc from '../DeleteVacc/DeleteVacc';

class Vacc extends Component {
  state = {
    showDelte: false,
  };

  showDeleteChild = () => {
    this.setState({ showDelte: !this.state.showDelte });
  };
  render() {
    return (
      <div>
        <div className={classes.Container}>
          <div className={classes.Vaccination}>
            <div>
              <span>
                <span className={classes.UniqueSpan}>اسم التطعيم :</span>
                &nbsp;{this.props.vaccNameAR}&nbsp;&nbsp;
                <i className='fas fa-notes-medical fa-2x'></i>
              </span>
              <span>
                معاد التطعيم :&nbsp;{this.props.vaccDate}&nbsp;&nbsp;{' '}
                <i className='far fa-clock'></i>
              </span>
              <span>
                الوصف :&nbsp;{this.props.vaccDesc}&nbsp;&nbsp;
                <i className='fas fa-comment-medical'></i>
              </span>
              <span>
                الفوائد :&nbsp;{this.props.vaccBenefits} &nbsp;&nbsp;
                <i className='fas fa-hand-holding-medical'></i>
              </span>
              <span>
                الاضرار :&nbsp;{this.props.vaccHarm}&nbsp;&nbsp;
                <i className='fas fa-lungs-virus'></i>
              </span>
              <span>
                تطعيم اضافي :&nbsp;{this.props.additionalVacc}&nbsp;&nbsp;
                <i className='fas fa-syringe '></i>
              </span>
            </div>
            <div>
              <button className={classes.Btn} onClick={this.showDeleteChild}>
                حذف
              </button>
            </div>
          </div>
        </div>
        <Backdrop show={this.state.showDelte} clicked={this.showDeleteChild} />
        <Modal show={this.state.showDelte}>
          <DeleteVacc
            show={this.state.showDelte}
            clicked={this.showDeleteChild}
            name={this.props.vaccName}
            nameArabic={this.props.vaccNameAR}
            date={this.props.vaccDate}
            description={this.props.vaccDesc}
            benefits={this.props.vaccBenefits}
            harm={this.props.vaccHarm}
            additionalVacc={this.props.additionalVacc}
            taken={this.props.vaccTaken}
          />
        </Modal>
      </div>
    );
  }
}

export default Vacc;
