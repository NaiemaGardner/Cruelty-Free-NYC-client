// carshow.js - shows individual card, card iq req.

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class CardShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      card: null
    }
  }

  componentDidMount (props) {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/cards/${this.props.match.params.category}/${this.props.match.params.id}`,
      method: 'GET',
      data: { card: this.state.card }
    })
      .then(res => this.setState({ card: res.data.card }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.showCardSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Show Card Failed',
          message: messages.showCardFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render (props) {
    console.log('props', props)
    const { card } = this.state
    console.log('card is', card)
    return <div>
      <p>{card.name}</p>
      <p>{card.url}</p>
      <Link to='/cards/'${...props.cards.category}>Back to List</Link>
    </div>
  }
}

export default CardShow
