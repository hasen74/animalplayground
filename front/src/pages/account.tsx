import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Register from '../components/Register'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import { fetchUserData } from '../services/UsersService'
import { IUser } from '../tools/Interfaces'

const AccountPage: NextPage = () => {
  const [user, setUser] = useState<IUser>()
  const [display, setDisplay] = useState<number>(0)
  const [login, setLogin] = useState<boolean>(false)

  // gets JWT and userId from sessionSorage to check if user if logged when page is loaded
  useEffect(() => {
    const userId = Number(sessionStorage.getItem('userId'))
    const token = String(sessionStorage.getItem('token'))
    if (userId) {
      /* if user is logged fetchs user's data 
      and sets account's display to show profile component */
      fetchUserData(userId, token).then(async (data: IUser) => {
        setUser(data)
        setDisplay(2)
      })
      setLogin(true) // sets navbar's display is user is logged
    }
    setDisplay(0) // sets account's display to show login component
  }, [])

  /* if user is updated and user is true:
  sets account's display to show profile component */
  useEffect(() => {
    if (user) {
      setDisplay(2)
    }
  }, [user])

  return (
    <div className="container">
      <Navbar login={login} />
      <div id="login">
        <div className="main">
          {/* checks display value and displays corresponding component */}
          {display === 0 && <Login setUser={setUser} setDisplay={setDisplay} setLogin={setLogin} />}
          {display === 1 && <Register setUser={setUser} setDisplay={setDisplay} setLogin={setLogin} />}
          {display === 2 && user && <Profile user={user} setDisplay={setDisplay} setLogin={setLogin} />}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AccountPage
