import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {
  static defaultProps = {
    onNewPost() {}
  }

  static propTypes = {
    onNewPost: PropTypes.func
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem href="/">Imgy</NavItem>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem onClick={this.props.onNewPost}>Upload Image</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
