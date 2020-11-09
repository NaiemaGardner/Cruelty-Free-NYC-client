import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#cards">Cards</Nav.Link>
    <Nav.Link href="#cards-create">Add A Buisness</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-bar" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="nav-bar" href="#sign-in">Login</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className="nav-bar" href="/Cruelty-Free-NYC-client/#/">Explore</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="nav-bar" variant="dark">
    <Navbar.Brand className="nav-title" href="#">
      Cruelty-Free: NYC
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Hello {user.name},</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
