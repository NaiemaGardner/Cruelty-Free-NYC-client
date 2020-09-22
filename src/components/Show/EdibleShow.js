// EdibleShow.js - shows individual edible card, card iq req.
// http://localhost:7165/#/cards/edibles/5f64d4aee30be233e59ea067

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import CardDisplay from '../Card/CardDisplay'

class EdibleShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      card: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/cards/edibles/${this.props.match.params.id}`,
      method: 'GET',
      data: { card: this.state.card }
    })
      .then(res => this.setState({ card: res.data.card.map() }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.showEdibleSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Failed!',
          message: messages.showEdibleFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render () {
    const { card } = this.state
    console.log('single resource ', card)

    return (
      <CardDisplay
        card={card}
      />
    )
  }
}

export default EdibleShow
