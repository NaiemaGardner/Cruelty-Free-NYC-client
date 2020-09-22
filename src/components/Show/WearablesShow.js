// WearablesShow.js - show wearables category

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
// import CardDisplay from '../Card/CardDisplay'

class WearablesShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wearablescards: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: (`${apiUrl}/cards/wearables`),
      method: 'GET',
      data: { card: this.state.card }
    })
      .then((res) => {
        this.setState({ wearablescards: res.data.wearablescards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexWearablesSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed',
          message: messages.indexWearablesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const wearablescards = this.state.wearablescards
    return (
      <div>
        <ul>
          {wearablescards}
        </ul>
      </div>
    )
  }
}

export default WearablesShow
