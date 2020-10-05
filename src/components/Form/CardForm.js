// cardform.js - card input template

import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const CardForm = ({ card, handleSubmit, handleChange, cancelPath }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Brand Category</Form.Label>
          <Form.Control as="select" value={card.category} name='category' onChange={handleChange}>
            <option>Choose A Category</option>
            <option>edibles</option>
            <option>cosmetics</option>
            <option>wearables</option>
            <option>services</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Business Name</Form.Label>
          <Form.Control type="text" placeholder="brand name <required>" value={card.name} name='name' onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="business address" value={card.address} name='address' onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="phone number" value={card.phone} name='phone' onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="email address" value={card.email} name='email' onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" placeholder="web address <required>" value={card.url} name='url' onChange={handleChange}/>
        </Form.Group>
        <button type='submit'>Submit</button>
        <Link to={cancelPath}>
          <button>Cancel</button>
        </Link>
      </Form>
    </div>
  </div>
)

export default CardForm
