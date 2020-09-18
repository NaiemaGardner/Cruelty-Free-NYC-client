// cardcreate.js - create new card, req. user token

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CardForm from '../Form/CardForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CardCreate extends Component {
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
      createdId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedCard = Object.assign({}, prevState.card, updatedField)

      return { card: editedCard }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/cards-create`,
      method: 'POST',
      data: { card: this.state.card },
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      .then(res => this.setState({ createdId: res.data.card._id }))
      .catch(console.error)
  }

  render () {
    const { card, createdId } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to={`/cards/${card.category}/${createdId}`} />
    }

    return (
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    )
  }
}

export default CardCreate
