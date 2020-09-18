// commentform.js - comment input template

import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (

  <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="comment title" value={comment.title} name='title' onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" placeholder="comment here" value={comment.content} name='content' onChange={handleChange}/>
      </Form.Group>
      <button type='submit'>Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link>
    </Form>
  </div>
)

export default CommentForm
