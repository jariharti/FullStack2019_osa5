// User has decided to logout -> Step 1: a button creation for logout operation
import React from 'react'
const LogoutForm = (
{
    handleLogOut,
    loggedPerson
}
) => {
    // User has decided to logout -> Step 1: a button creation for logout operation
    return (
    <form onSubmit={handleLogOut}>
      <p>
         {loggedPerson} logged in
         <button type="submit">logout</button>
      </p>
    </form>  
    )
  }

  export default LogoutForm
