// ServicesShow.js - show services category

import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
// import CardDisplay from '../Card/CardDisplay'

class ServicesShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      servicescards: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: (`${apiUrl}/cards/services`),
      method: 'GET',
      data: { card: this.state.card }
    })
      .then((res) => {
        this.setState({ servicescards: res.data.servicescards })
        if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexServicesSuccess,
            variant: 'success'
          })
        }
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed',
          message: messages.indexServicesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const servicescards = this.state.servicescards
    return (
      <div>
        <ul>
          {servicescards}
        </ul>
      </div>
    )
  }
}

export default ServicesShow
