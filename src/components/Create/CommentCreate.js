// cardcomment.js - create new comment

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CommentForm from '../Form/CommentForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      card: {
        category: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        url: ''
      },
      comment: {
        title: '',
        content: ''
      },
      cardId: null,
      createdId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedComment = Object.assign({}, prevState.comment, updatedField)

      console.log('updatedField is', updatedField)
      console.log('editedComment is', editedComment)

      return { comment: editedComment }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/cards/${this.props.cards.category}/${this.props.match.params.id}/comments-create`,
      method: 'POST',
      data: { comment: this.state.comment },
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      .then(res => this.setState({ createdId: res.data.comment._id }))
      .catch(console.error)
  }

  render () {
    const { card, comment, createdId } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to={`/cards/${card.category}/${card._id}/comments/${createdId}`} />
    }

    return (
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    )
  }
}

export default CommentCreate
