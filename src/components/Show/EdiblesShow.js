// EdiblesShow.js - show edibles category

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
// import CardDisplay from '../Card/CardDisplay'

class EdiblesShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ediblescards: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: (`${apiUrl}/cards/edibles`),
      method: 'GET',
      data: { card: this.state.card }
    })
      .then((res) => {
        this.setState({ ediblescards: res.data.ediblescards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexEdiblesSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed',
          message: messages.indexEdiblesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const ediblescards = this.state.ediblescards
    return (
      <div>
        <ul>
          {ediblescards}
        </ul>
      </div>
    )
  }
}

export default EdiblesShow
