import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { fetchUserData } from '../services/UsersService'
import { IOrder, IUser } from '../tools/Interfaces'

// Component for user's order(s) display

function Order(props: { setOrderId: Dispatch<SetStateAction<number>> }) {
  const [user, setUser] = useState<IUser>()

  // checks if userId and JWT are in sessionStorage when page is loaded
  useEffect(() => {
    const userId = Number(sessionStorage.getItem('userId'))
    const token = sessionStorage.getItem('token')
    if (userId && token) { // fetchs user's data
      fetchUserData(userId, token).then((data) => {
        setUser(data)
      })
    }
  }, [])

  return (
    <div className="order">
      {/* .map to display each element of user.Orders[] */}
      {user &&
        user.Orders &&
        user.Orders.map((order: IOrder, i) => {
          if (order.order_date !== null) {
            // if order is paid: displays it
            return (
              <div key={order.id}>
                {/* onClick: changes history's orderId variable state */}
                <button id="btn-order" onClick={() => props.setOrderId(order.id)}>
                  <>
                    Order #{order.id} {new Date(order.order_date!).toLocaleString()}
                  </>
                </button>
              </div>
            )
          }
        })}
    </div>
  )
}

export default Order
