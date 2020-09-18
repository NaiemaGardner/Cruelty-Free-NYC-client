// carddelete.js - delete a card, card id req. & ownership

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class Card extends Component {
  constructor (props) {
    super(props)

    this.state = {
      card: null,
      deleted: false,
      redirect: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/cards/${this.props.cards.category}/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { card: this.state.card }
    })
      .then(res => this.setState({ card: res.data.card }))
      .catch(console.error)
  }

  handleClick = () => {
    this.setState({ redirected: true })
  }

  deleteCard = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/cards/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Card Successfully',
        message: messages.deleteCardSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Delete Card Failure' + error.message,
          message: messages.deleteCardFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { card, deleted, redirected } = this.state

    if (deleted) {
      return <Redirect to={{
        pathname: `/cards/${card.category}`,
        state: { msgAlert: 'Deleted card successfully' }
      }} />
    }

    if (redirected) {
      return <Redirect to={{ pathname: '/cards-create' }} />
    }

    return (
      <div className="card">
        <h7>{card.category}</h7><br/>
        <p> </p>
        <p>Product: {card.product}</p>
        <p>Quantity: {card.quantity}</p>
        <p>Price: ${card.price}</p>
        <button onClick={this.handleClick}>Edit</button>
        <button onClick={this.deleteCard}>Delete</button><br/>
        <Link to='/cards/:category'>Back To List</Link>
      </div>
    )
  }
}

export default Card
