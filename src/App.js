import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
// import GetToken from './components/Pages/GetToken/GetToken';
import Aux from './hoc/auxilliary';
import Navber from './components/Navbar/Navber';
import SideBar from './components/Navbar/SideBar/SideBar';
import Home from './containers/Home/Home';
import Login from './components/Pages/Login/Login';
import Users from './containers/Users/Users';
import ViewUser from './components/UserController/ViewUser/ViewUser';
import Children from './containers/Children/Children';
import ViewChild from './components/ChildController/ViewChild/ViewChild';
import Vaccination from './containers/Vaccination/Vaccination';
import { Route, Switch } from 'react-router-dom';
import AuthComponent from './components/Pages/AuthComponent/AuthComponent';

class App extends Component {
  state = {
    showSide: false,
  };

  showSideHandler = () => {
    this.setState({ showSide: !this.state.showSide });
  };

  render() {
    return (
      <Aux>
        <Navber show={this.showSideHandler} />
        <SideBar
          showSideBar={this.state.showSide}
          closeSide={this.showSideHandler}
        />
        <Route path='/login' exact component={Login} />
        <AuthComponent>
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/users' exact component={Users} />
              <Route path='/users/:id' exact component={ViewUser} />
              <Route path='/children' exact component={Children} />
              <Route path='/children/:id' exact component={ViewChild} />
              <Route path='/vaccination' exact component={Vaccination} />
            </Switch>
          </div>
        </AuthComponent>
      </Aux>
    );
  }
}

export default App;
