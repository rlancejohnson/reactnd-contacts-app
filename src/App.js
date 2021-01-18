import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact.js';
import { Route, Link } from 'react-router-dom';
import ContactDetails from './ContactDetails';

export default class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    const { contacts } = this.state

    return (
      <div>
        <Route exact path='/' render={() => (
          <div style={{width: '50%', margin: 'auto'}}>
            <h1>Home</h1>
            <Link to='/contacts'><button style={{padding: '2%'}}>Open Contacts App</button></Link>
          </div>
        )}/>

        <Route exact path='/contacts' render={() => (
          <ListContacts 
            contacts={contacts}
            onDeleteContact={this.removeContact}/>
        )}/>

        <Route exact path='/contacts/:handle' render={({ match }) => (
          <ContactDetails contacts={contacts} match={match}/>
        )}/>

        <Route exact path='/create' render={({ history }) => (
          <CreateContact onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/contacts')
          }}/>
        )}/>
      </div>
    );
  }
}