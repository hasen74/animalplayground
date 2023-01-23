import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CartList from '../components/CartList'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { payCart } from '../services/CartServices'
import { fetchUserData } from '../services/UsersService'
import { IUser } from '../tools/Interfaces'

const CartPage: NextPage = () => {
  const [user, setUser] = useState<IUser>()
  const [orderId, setOrderId] = useState<number>(0)
  const [token, setToken] = useState<string | null>('')
  const [display, setDisplay] = useState<boolean>(false)

  // gets JWT and userId from sessionSorage to check if user if logged when page is loaded
  useEffect(() => {
    const userId = Number(sessionStorage.getItem('userId'))
    const token = String(sessionStorage.getItem('token'))
    setToken(token)
    if (userId) {
      // if user is logged fetchs user's data
      fetchUserData(userId, token).then((data) => {
        setUser(data)
      })
    }
  }, [])

  /* when user is updated checks if user has orders
  if yes: orderId <= last user's order.id */
  useEffect(() => {
    if (user && user.Orders && user.Orders?.length !== 0) {
      if (!user.Orders[user.Orders.length - 1].order_date) {
        setOrderId(user.Orders[user.Orders.length - 1].id)
        setDisplay(true) // sets cart's page display to show the cart's product(s)
      }
    }
  }, [user])

  return (
    <div className="container">
      <Navbar />
      <div id='main'>
      {/* if display === true: shows the cart | if display === false: shows a message */}
      {display && (
        <div id="cart-page">
          <div id="cart-child">
            <CartList orderId={orderId} token={token} setDisplay={setDisplay} />
            </div>
            <div id="payment">
              <button id="btn-payment" onClick={async () => payCart(orderId, token, setDisplay)}>
                Proceed to payment
              </button>
            </div>
          </div>
        )}
        {!display && <div>You have no products in your cart</div>}
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
