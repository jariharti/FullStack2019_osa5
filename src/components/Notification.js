// Notify user from success case and error cases. Style is defined in app.cs file. Color code for success cases is green, for errors it is read //
import React from 'react'
const Notification = ({
  message,
  notificationMessageType
}
) => {
  if (message === null) {
    return null
  }
  else {
    return (
      <div className = {notificationMessageType} >
        {message}
      </div>
    )
    }
  }

export default Notification