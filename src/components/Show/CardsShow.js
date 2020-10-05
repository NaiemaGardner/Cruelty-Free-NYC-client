import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class Cards extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cards: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: (`${apiUrl}/cards`),
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ cards: res.data.cards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexCardSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Indexing Cards Failed',
          message: messages.indexCardFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const cards = this.state.cards.map(card => (
      <li key={card._id}>
        <Link to={`/cards/${card._id}`}>
          {card.name}
        </Link>
        <p></p>
        <p>{card.category}</p>
        <p>{card.address}</p>
        <p>{card.phone}</p>
        <p>{card.email}</p>
        <p>{card.url}</p>
      </li>
    ))

    return (
      <div>
        <ul>
          {cards}
        </ul>
      </div>
    )
  }
}

export default Cards
