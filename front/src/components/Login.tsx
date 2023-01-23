import { Dispatch, SetStateAction, useState } from 'react'
import { fetchTokenLogin } from '../services/UsersService'
import { IUser } from '../tools/Interfaces'

// login form component

export default function Login(props: {
  setUser: Dispatch<SetStateAction<IUser | undefined>>
  setDisplay: Dispatch<SetStateAction<number>>
  setLogin: Dispatch<SetStateAction<boolean>>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let input: HTMLInputElement | null

  // function for login form
  const handleSubmit = async (event: any) => {
    event.preventDefault() // prevents page refresh
    await fetchTokenLogin(email, password).then((data: IUser) => {
      props.setUser(data)
    }) // fetchs JWT and user's data
    props.setLogin(true) // sets navbar's display
    setEmail('')
    setPassword('')
  }

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="log_email">Email:</label>
          </li>
          <li>
            <input
              type="text"
              name="log_email"
              id="log_email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </li>

          <li>
            <label htmlFor="log_pass">Password:</label>
          </li>
          <li>
            <input
              type="password"
              name="log_pass"
              id="log_pass"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </li>
          <li>
            <input
              type="checkbox"
              onClick={() => (
                (input = document.getElementById('log_pass') as HTMLInputElement),
                input.type === 'password' ? (input.type = 'text') : (input.type = 'password')
              )} // checkbox to show password as text or dots
            />
            show password
          </li>
          <li>
            <button>Send</button>
          </li>
        </ul>
      </form>
      {/* button to change account display: it will display register form */}
      <button id="btn-register" onClick={() => props.setDisplay(1)}>
        Register
      </button>
    </div>
  )
}
