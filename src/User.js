import userEvent from '@testing-library/user-event'
import React from 'react'

export default function User( { user }) {
  return (
    <div>
      <label>
        <ul>
          <li>
            <div>Name: {user.name} </div>
            <div>Email: {user.email} </div>
          </li>
        </ul>
      </label>
    </div>
  )
}
