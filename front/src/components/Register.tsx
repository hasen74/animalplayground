import { Dispatch, SetStateAction, useState } from 'react'
import { fetchTokenLogin, registerUser } from '../services/UsersService'
import { IUser } from '../tools/Interfaces'

// register form component

export default function Register(props: {
  setUser: Dispatch<SetStateAction<IUser | undefined>>
  setDisplay: Dispatch<SetStateAction<number>>
  setLogin: Dispatch<SetStateAction<boolean>>
}) {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const registerIsEnabled = email.length > 0 && password.length > 0 // condition to block registration

  // function when form is submitted
  const handleRegistration = async (event: any) => {
    event.preventDefault() //prevents page refresh
    await registerUser(firstName, lastName, email, address, phone, password)
    await fetchTokenLogin(email, password).then((data: IUser) => {
      props.setUser(data)
    }) // fetchs JWT and user's data
    props.setLogin(true) // sets navbar's display
    setFirstName('')
    setLastName('')
    setEmail('')
    setAddress('')
    setPhone('')
    setPassword('')
  }

  return (
    <div id="register">
      <form onSubmit={handleRegistration}>
        <ul>
          <li>
            <label htmlFor="first_name">First name:</label>
          </li>
          <li>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />
          </li>
          <li>
            <label htmlFor="last_name">Last name:</label>
          </li>
          <li>
            {' '}
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
          </li>
          <li>
            {' '}
            <label htmlFor="email">E-mail:</label>
          </li>
          <li>
            {' '}
            <input
              type="text"
              name="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </li>
          <li>
            {' '}
            <label htmlFor="address">Address:</label>
          </li>
          <li>
            {' '}
            <input
              type="text"
              name="address"
              id="address"
              onChange={(event) => setAddress(event.target.value)}
              value={address}
            />
          </li>
          <li>
            <label htmlFor="phone">Phone number:</label>
          </li>
          <li>
            {' '}
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={(event) => setPhone(event.target.value)}
              value={phone}
            />
          </li>
          <li>
            {' '}
            <label htmlFor="password">Password:</label>
          </li>
          <li>
            {' '}
            <input
              type="text"
              name="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </li>
        </ul>
        <button disabled={!registerIsEnabled}>Submit</button>
      </form>
      {/* changes account's display to show user's profile */}
      <button id="btn-return" onClick={() => props.setDisplay(0)}>
        Return
      </button>
    </div>
  )
}
