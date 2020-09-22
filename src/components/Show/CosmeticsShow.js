// CosmeticsShow.js - show cosmetics category

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
// import CardDisplay from '../Card/CardDisplay'

class CosmeticsShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cosmeticscards: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: (`${apiUrl}/cards/cosmetics`),
      method: 'GET',
      data: { card: this.state.card }
    })
      .then((res) => {
        this.setState({ cosmeticscards: res.data.cosmeticscards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexCosmeticsSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed',
          message: messages.indexCosmeticsFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const cosmeticscards = this.state.cosmeticscards
    return (
      <div>
        <ul>
          {cosmeticscards}
        </ul>
      </div>
    )
  }
}

export default CosmeticsShow
