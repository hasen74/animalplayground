import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { logout } from '../tools/functions'

// Navbar component

function Navbar(props: { login?: boolean }) {
  const [user, setUser] = useState<boolean>(false)

  // checks if there is a token in sessionStorage when the page is loaded
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setUser(true) // sets navbar's display
    }
  }, [])

  // updates navbar's display when props.login change
  useEffect(() => {
    if (props.login) {
      setUser(props.login)
    }
  }, [props.login])

  return (
    <div id="header">
      <div id="logo">
        <Image src={require('./logo.png')} alt="logo" className="image" />
      </div>
      <div id="motto">
        <p>"Our pets deserve the best of fun !"</p>
      </div>
      <div id="nav">
        <ul id="links">
          {/* displays it if logged */}
          {user && (
            <li>
              <Link href="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          )}
          {/* displays it if logged */}
          {user && (
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          )}
            <li>
              <Link href="/account">Account</Link>
            </li>
          <li>
            <Link href="/">Shop</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
