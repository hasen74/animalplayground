import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cart from '../../components/CartList'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Order from '../../components/Order'

const HistoryPage: NextPage = () => {
  const router: NextRouter = useRouter()
  const [orderId, setOrderId] = useState<number>(0)
  const [token, setToken] = useState<string | null>('')

  // gets JWT from sessionStorage when page is loaded
  useEffect(() => {
    const token = String(sessionStorage.getItem('token'))
    setToken(token)
  }, [])

  return (
    <div className="container">
      <Navbar />
      <div id="main">
        <div className="orderHistory">
          <div className="cart-history">
          <p>Order History</p>
            <Order setOrderId={setOrderId} />
            <Cart orderId={orderId} token={token} />

            <div>
              <button id="btn-history-return" onClick={() => router.push('/account')}>Return</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default HistoryPage
