import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      card: {
        category: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        url: ''
      },
      deleted: false,
      redirect: false
    }
  }
  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/cards/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
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

  handleClick = () => {
    this.setState({ redirected: true })
  }

  destroyCard = () => {
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
      .catch(() => {
        msgAlert({
          heading: 'Delete Card Failure',
          message: messages.deleteCardFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { card, deleted, redirected } = this.state
    if (deleted) {
      return <Redirect to={{
        pathname: '/cards',
        state: { msgAlert: 'Deleted card successfully' }
      }} />
    }

    if (redirected) {
      return <Redirect to={{ pathname: `/cards/${this.props.match.params.id}/update` }} />
    }

    return (
      <div>
        <p>{card.category}</p><br/>
        <p></p>
        <p>{card.name}</p>
        <p>{card.address}</p>
        <p>{card.phone}</p>
        <p>{card.email}</p>
        <p>{card.url}</p>
        <button onClick={this.handleClick}>Edit</button>
        <button onClick={this.destroyCard}>Delete</button><br/>
        <p></p><br/>
        <Link to='/cards'>Return</Link>
      </div>
    )
  }
}

export default Card
