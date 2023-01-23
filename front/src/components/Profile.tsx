import { NextRouter, useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { logout } from '../tools/functions'
import { IUser } from '../tools/Interfaces'

// Component to display user's data

function Profile(props: {
  user: IUser
  setDisplay: Dispatch<SetStateAction<number>>
  setLogin: Dispatch<SetStateAction<boolean>>
}) {
  const router: NextRouter = useRouter()

  return (
    <div className="profile">
      <div id="accountTitle">ACCOUNT INFO</div>
      <div id="userInfo">
        <div id="fieldName">
          <p>First name:</p>
          <p>Last name:</p>
          <p>Email:</p>
          <p>Phone:</p>
          <p>Address:</p>
        </div>
        <div id="fieldInfo">
          <p>{props.user.first_name}</p>
          <p>{props.user.last_name}</p>
          <p>{props.user.email}</p>
          <p>{props.user.phone}</p>
          <p>{props.user.address}</p>
        </div>
      </div>
      <div id="profile-btn">
        <button id="btn-orderHistory" onClick={() => router.push('/account/history')}>
          Order History
        </button>
      </div>
      <div id="logout-btn">
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

export default Profile
