// app.js - set up UI routes

import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CardsShow from '../Show/CardsShow'
import CardShow from '../Show/CardShow'
import CardCreate from '../Create/CardCreate'
import CardUpdate from '../Update/CardUpdate'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }
  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }
  render () {
    const { msgAlerts, user } = this.state
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main>
          <h2 className='first-statement'>compassionate alternatives</h2>
          <h2 className='second-statement'>ethical brands</h2>

          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/cards' render={() => (
            <CardsShow msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/cards/:id' render={({ match }) => (
            <CardShow msgAlert={this.msgAlert} user={user} match={match}/>
          )} />

          <AuthenticatedRoute user={user} path='/cards-create' render={({ match }) => (
            <CardCreate user={user} match={match} msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/cards/:id/update' render={({ match }) => (
            <CardUpdate user={user} match={match}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App

// import React, { Component, Fragment } from 'react'
// import { Route } from 'react-router-dom'
//
// import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
// import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
// import Header from '../Header/Header'
// import SignUp from '../SignUp/SignUp'
// import SignIn from '../SignIn/SignIn'
// import SignOut from '../SignOut/SignOut'
// import ChangePassword from '../ChangePassword/ChangePassword'
// import Home from '../HomePage/Home'
// import EdiblesShow from '../Show/EdiblesShow'
// import CosmeticsShow from '../Show/CosmeticsShow'
// import WearablesShow from '../Show/WearablesShow'
// import ServicesShow from '../Show/ServicesShow'
// import EdibleShow from '../ Show/EdibleShow'
// import CosmeticShow from '../Show/CosmeticShow'
// import WearableShow from '../Show/WearableShow'
// import ServiceShow from '../Show/ServiceShow'
// // import CardShow from '../Show/CardShow'
// import CardCreate from '../Create/CardCreate'
// import CommentCreate from '../Create/CommentCreate'
//
// class App extends Component {
//   constructor () {
//     super()
//
//     this.state = {
//       user: null,
//       msgAlerts: []
//     }
//   }
//
//   setUser = user => this.setState({ user })
//
//   clearUser = () => this.setState({ user: null })
//
//   msgAlert = ({ heading, message, variant }) => {
//     this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
//   }
//
//   render () {
//     const { msgAlerts, user } = this.state
//
//     return (
//       <Fragment>
//         <Header user={user} />
//         {msgAlerts.map((msgAlert, index) => (
//           <AutoDismissAlert
//             key={index}
//             heading={msgAlert.heading}
//             variant={msgAlert.variant}
//             message={msgAlert.message}
//           />
//         ))}
//         <main className="container">
//           <Route path='/sign-up' render={() => (
//             <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
//           )} />
//           <Route path='/sign-in' render={() => (
//             <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
//           )} />
//           <Route path='/cards' render={() => (
//             <Home msgAlert={this.msgAlert} />
//           )} />
//
//           <Route exact path='/cards/edibles' render={() => (
//             <EdiblesShow msgAlert={this.msgAlert} />
//           )} />
//           <Route exact path='/cards/cosmetics' render={() => (
//             <CosmeticsShow msgAlert={this.msgAlert} />
//           )} />
//           <Route exact path='/cards/wearables' render={() => (
//             <WearablesShow msgAlert={this.msgAlert} />
//           )} />
//           <Route exact path='/cards/services' render={() => (
//             <ServicesShow msgAlert={this.msgAlert} />
//           )} />
//
//           <Route exact path='/cards/edibles/:id' render={({ match }) => (
//             <EdibleShow msgAlert={this.msgAlert} match={match} />
//           )} />
//           <Route exact path='/cards/cosmetics/:id' render={({ match }) => (
//             <CosmeticShow msgAlert={this.msgAlert} match={match} />
//           )} />
//           <Route exact path='/cards/wearables/:id' render={({ match }) => (
//             <WearableShow msgAlert={this.msgAlert} match={match} />
//           )} />
//           <Route exact path='/cards/services/:id' render={({ match }) => (
//             <ServiceShow msgAlert={this.msgAlert} match={match}/>
//           )} />
//
//           <AuthenticatedRoute user={user} path='/sign-out' render={() => (
//             <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
//           )} />
//
//           <AuthenticatedRoute user={user} path='/change-password' render={() => (
//             <ChangePassword msgAlert={this.msgAlert} user={user} />
//           )} />
//
//           <AuthenticatedRoute user={user} path='/cards-create' render={() => (
//             <CardCreate msgAlert={this.msgAlert} user={user} />
//           )} />
//
//           <AuthenticatedRoute user={user} path='cards/:id/comment-create' render={() => (
//             <CommentCreate msgAlert={this.msgAlert} user={user} />
//           )} />
//
//         </main>
//       </Fragment>
//     )
//   }
// }
//
// export default App
