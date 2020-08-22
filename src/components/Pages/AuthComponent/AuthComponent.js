import React, { Component } from 'react';
import GetToken from '../GetToken/GetToken';
// import axios from 'axios';
// import Spinner from '../../UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/auxilliary';

class AuthComponent extends Component {
  state = {
    loading: false,
  };

  constructor(props) {
    super(props);
    const token = GetToken();
    if (!token && token !== 'admin') {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    const token = GetToken();
    if (token && token === 'admin') {
      this.setState({ loading: true });
    }
  }
  render() {
    return (
      <Aux>{this.state.loading ? <div>{this.props.children}</div> : null}</Aux>
    );
  }
}

export default withRouter(AuthComponent);
