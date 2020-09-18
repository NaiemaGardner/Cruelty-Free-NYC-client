// catergoryshow.js - shows all cards within category

import React, { Component } from 'react'
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
      url: (`${apiUrl}/cards/${this.props.match}`)
    })
      .then((res) => {
        this.setState({ cards: res.data.cards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexCardsSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed!',
          message: messages.indexCardsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const cards = this.state

    return (
      <div className="items">
        <h7>Items</h7><br/>
        <p> </p>
        <p> </p>
        <ul>
          {cards}
        </ul>
      </div>
    )
  }
}

export default Cards
