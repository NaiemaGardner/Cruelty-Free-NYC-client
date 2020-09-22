import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Home = () => (
  <Nav>
    <Nav.Item>
      <Nav.Link href="#cards/edibles">Edibles</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#cards/cosmetics">Cosmetics</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#cards/wearables">Wearables</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="#cards/services">Service Providers</Nav.Link>
    </Nav.Item>
  </Nav>
)

export default Home
