import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CommentForm from './CommentForm'

// import the api's url
import apiUrl from '../../apiConfig'

// Import axios so we can make HTTP requests
import axios from 'axios'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Add some comment state
      comment: {
        // set the default title and author to empty strings
        title: '',
        content: ''
      },
      // Initially, the comment has not been created, when it has been created, we will
      // keep track of the comment's id, so we can redirect to it later
      createdId: null
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

      // copy all of the comment's properties onto the newly created object ({})
      // then copy the updated field onto that new object
      const editedComment = Object.assign({}, prevState.comment, updatedField)

      console.log('updatedField is', updatedField)
      console.log('editedComment is', editedComment)

      // return the state change, of setting the `comment` state to its new value of
      // `editedComment`
      return { comment: editedComment }
    })
  }

  handleSubmit = event => {
    // prevent the page from refreshing
    event.preventDefault()

    axios({
      url: `${apiUrl}/cards/:id/comments-create`,
      method: 'POST',
      // send the new value for our comment, which comes from `this.state`
      data: { comment: this.state.comment },
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      // if we succesfully created the comment, set the `createdId` state to the id
      // of the comment we got back in the response's data
      .then(res => this.setState({ createdId: res.data.comment._id }))
      .catch(console.error)
  }

  render () {
    // destructure comment to show in the form below, and createdId to redirect
    const { comment, createdId } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the comment
    if (createdId) {
      // redirect to the show page (route)
      return <Redirect to={`/cards/:id/comments/${createdId}`} />
    }

    return (
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    )
  }
}

export default CommentCreate
