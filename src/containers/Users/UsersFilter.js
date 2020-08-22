import React, { Component } from 'react';

class UsersFilter extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  state = {
    filterdUser: null,
  };

  componentDidUpdate() {
    if (this.state.filterdUser === null) {
      this.text.current.value = '';
    }
  }

  filtered = (input) => {
    let filter = this.props.users.filter((user) => {
      const regex = new RegExp(`${input}`, 'gi');
      return user.name.match(regex) || user.phone.match(regex);
    });
    this.setState({ filterdUser: filter });
  };

  changeSearchHandler = (e) => {
    if (this.text.current.value !== '') {
      this.filtered(e.target.value);
    } else {
      this.setState({ filterdUser: null });
    }
  };
  render() {
    return (
      <form>
        <input
          ref={this.text}
          type='text'
          placeholder='Search'
          onChange={this.changeSearchHandler}
        />
      </form>
    );
  }
}

export default UsersFilter;
