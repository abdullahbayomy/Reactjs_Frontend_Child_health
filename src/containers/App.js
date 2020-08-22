import React, { Component } from 'react';
import './App.css';
import Aux from '../hoc/auxilliary';
import Navber from '../components/Navbar/Navber';
import SideBar from '../components/Navbar/SideBar/SideBar';
import Home from '../components/Pages/Home/Home';
import Login from '../components/Pages/Login/Login';
import Users from '../components/Users/Users';
import Children from '../components/Children/Children';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    showSide: false,
  };

  showSideHandler = () => {
    this.setState({ showSide: !this.state.showSide });
  };

  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Navber show={this.showSideHandler} />
          <SideBar
            showSideBar={this.state.showSide}
            closeSide={this.showSideHandler}
          />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' exact component={Login} />
              <Route path='/users' exact component={Users} />
              <Route path='/children' exact component={Children} />
            </Switch>
          </div>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
