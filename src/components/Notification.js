import React from 'react'

// Notify user from success case and error cases. Style is defined in app.cs file. Color code for success cases is green, for errors it is read //
const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className = {props.notificationMessageType} >
      {props.message}
    </div>
  )
}

export default Notification