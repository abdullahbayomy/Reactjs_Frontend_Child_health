import React, { Component } from 'react';
import Vacc from '../../components/VaccinationController/Vacc/Vacc';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Vaccination.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import UpdateVaccintion from '../../components/VaccinationController/UpdateVaccintion/UpdateVaccintion';
import Aux from '../../hoc/auxilliary';

class Vaccination extends Component {
  state = {
    children: [],
    loading: false,
    showAddVacc: false,
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/v1/children')
      .then((response) => {
        this.setState({
          loading: true,
          children: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showAddVaccHandler = () => {
    this.setState({ showAddVacc: !this.state.showAddVacc });
  };

  render() {
    let vaccButton = <Spinner />;
    if (this.state.loading) {
      if (this.state.children[0]) {
        let childVacc = this.state.children[0].vaccination;
        vaccButton = childVacc.map((vacc, index) => {
          return (
            <Vacc
              key={index}
              vaccName={vacc.name}
              vaccNameAR={vacc.nameArabic}
              vaccDate={vacc.date}
              vaccDesc={vacc.description}
              vaccBenefits={vacc.benefits}
              vaccHarm={vacc.harm}
              additionalVacc={vacc.additionalVacc}
              vaccTaken={vacc.taken}
            />
          );
        });
      }
    }
    return (
      <Aux>
        <div className={classes.BtnAddDiv}>
          <button className={classes.BtnAdd} onClick={this.showAddVaccHandler}>
            اضافة تطعيم
          </button>
        </div>
        <div>
          <div className={classes.Container}>
            <h1
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#0c2854',
              }}
            >
              قائمة التطعيمات
            </h1>
            {vaccButton}
          </div>
          <Backdrop
            show={this.state.showAddVacc}
            clicked={this.showAddVaccHandler}
          />
          <Modal show={this.state.showAddVacc}>
            <UpdateVaccintion
              show={this.state.showAddVacc}
              cancel={this.showAddVaccHandler}
            />
          </Modal>
        </div>
      </Aux>
    );
  }
}

export default Vaccination;
