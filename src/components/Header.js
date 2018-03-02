import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem href="/">Imgy</NavItem>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="/upload">Upload Image</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
