import React from 'react'
import {Alert} from 'reactstrap'

const Notification = ({notification}) => {
  if(!notification) return null
  return notification.type === 'success'
    ? <Alert color='success'>{notification.content}</Alert>
    : <Alert color='danger'>{notification.content}</Alert>
}

export default Notification