import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactDetails({ contacts, match }) {
    const contact = contacts.find(({ handle }) => handle === match.params.handle)

    return (
        <div>
            <Link className='close-create-contact' to='/contacts'>Close</Link>
            <div className='contact-list-item'>
                <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.handle}</p>
                </div>
            </div>
        </div>
    )
}