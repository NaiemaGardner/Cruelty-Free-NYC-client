// ServiceShow.js - shows individual service card, card iq req.

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class CosmeticShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      card: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/cards/services/${this.props.match.params.id}`,
      method: 'GET',
      data: { card: this.state.card }
    })
      .then(res => this.setState({ card: res.data.card.map() }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.showServiceSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Failed!',
          message: messages.showServiceFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render () {
    const { card } = this.state
    console.log('single resource ', card)

    return (
      <div>
        <ul>
          <p>Card Here</p>
          {card}
        </ul>
      </div>
    )
  }
}

export default CosmeticShow
