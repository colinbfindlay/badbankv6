import React from 'react'
import User from './User'

export default function UserList({ ctx }) {
  return (
    ctx.users.map(user => {
      return <User key={user.id} user={user} />
    })
  )
}
