import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {

  let style = {}

  if(errorMessage) {
    style = {
      color: 'red',
      fontSize: 20,
      borderStyle: 'solid',
      borderWidth: 'medium',
      borderColor: 'red',
      textAlign: 'center'
    }
  }else if(successMessage) {
    style = {
      color: 'green',
      fontSize: 20,
      borderColor: 'green',
      borderStyle: 'solid',
      borderWidth: 'medium',
      textAlign: 'center'
    }
  }

  return (
    <div style={style}>
      <p>{ errorMessage
        ? errorMessage
        : successMessage
      }</p>
    </div>
  )
}

export default Notification
