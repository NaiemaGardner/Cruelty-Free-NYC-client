// cardupdate.js - update card, req. card id & ownership

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CardForm from '../Form/CardForm'

// import the api's url
import apiUrl from '../../apiConfig'

// Import axios so we can make HTTP requests
import axios from 'axios'

class CardUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Add some card state
      card: {
        // set the default title and author to empty strings
        category: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        url: ''
      },
      // Initially, the card has not been created, when it has been created, we will
      // keep track of the card's id, so we can redirect to it later
      updatedId: null
    }
  }

  /* The handleChange event handler, will update our state, when an input's value changes */
  handleChange = event => {
    // by default react will re-use events after the event handler has finished running
    // the updater function we passed to setState will not be run until after handleChange has finished
    // when react re-uses event's, it sets event.target's properties to `null`
    // to prevent React from nullifying those properties, we call `event.persist`
    event.persist()

    // Updating our state will depend on the previous state, so we use the `updater`
    // callback, to get access to our previous state
    this.setState(prevState => {
      // Create an object that represents the change in state
      // event.target.name refers to the input that has changed's name, ex. 'title'
      // the new value, will come from `event.target.value`
      // ex. { title: 1984 }
      const updatedField = { [event.target.name]: event.target.value }

      // copy all of the card's properties onto the newly created object ({})
      // then copy the updated field onto that new object
      const editedCard = Object.assign({}, prevState.card, updatedField)

      console.log('updatedField is', updatedField)
      console.log('editedCard is', editedCard)

      // return the state change, of setting the `card` state to its new value of
      // `editedCard`
      return { card: editedCard }
    })
  }

  handleSubmit = event => {
    // prevent the page from refreshing
    event.preventDefault()

    axios({
      url: `${apiUrl}/cards/${this.props.cards.category}/${this.props.match.params.id}`,
      method: 'PATCH',
      // send the new value for our card, which comes from `this.state`
      data: { card: this.state.card },
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      // if we succesfully created the card, set the `createdId` state to the id
      // of the card we got back in the response's data
      .then(res => this.setState({ updatedId: res.data.card._id }))
      .catch(console.error)
  }

  render () {
    // destructure card to show in the form below, and createdId to redirect
    const { card, updatedId } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the card
    if (updatedId) {
      // redirect to the show page (route)
      return <Redirect to={`/cards/${card.category}/${updatedId}`} />
    }

    return (
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    )
  }
}

export default CardUpdate
