import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CardForm from './CardForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CardUpdate extends Component {
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
      updated: false
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
      url: `${apiUrl}/cards/${this.props.match.params.id}/update`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { card: this.state.card }
    })
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { card, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/cards/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <CardForm
          card={card}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/cards/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default CardUpdate
