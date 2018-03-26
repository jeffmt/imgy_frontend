import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {
  render() {
    const {onNewPost} = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem href="/">Imgy</NavItem>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {
            onNewPost ?
            (
              <NavItem onClick={this.props.onNewPost}>Upload Image</NavItem>
            )
            : null
          }
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
