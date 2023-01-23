import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { cartClear, productDel } from '../services/CartServices'
import { fetchOrderData } from '../services/OrdersService'
import { getQuantityValue } from '../tools/functions'
import { IOrder, IProduct } from '../tools/Interfaces'

// Component for an order's product(s) display

function CartList(props: {
  orderId: number
  token: string | undefined | null
  setDisplay?: Dispatch<SetStateAction<boolean>>
}) {
  const [order, setOrder] = useState<IOrder>()
  const [quantity, setQuantity] = useState<number>(1)

  // fetchs order's data when page is loaded and when order is updated
  useEffect(() => {
    fetchOrderData(props.orderId).then((data: IOrder) => {
      setOrder(data)
    })
  }, [props.orderId, order])

  return (
    <div className="cart-list">
      {/* .map to display each element of order.Products */}
      {order &&
        order.Products!.map((product: IProduct) => {
          return (
            <div id="container-cart-list">
              <div id="cart-fieldName">
                <div>Product:</div>
                <div>Quantity:</div>
                <div>Price:</div>
              </div>
              <div id="cart-fieldInfo" key={product.id}>
                <div className="product-name">{product.name}</div>
                <div className="product-quantity">{product.Order_Product!.quantity}</div>
                <div className="product-price">{product.price * product.Order_Product!.quantity}€</div>
              </div>
              {/* display delete button only for the cart */}
              <div id="changeQuantity">
                {order.order_date === null && (
                  <div id="product-del">
                    <label htmlFor="quantity">Quantity (1-{product.Order_Product!.quantity}):</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      defaultValue={1}
                      min="1"
                      max={String(product.Order_Product!.quantity)}
                      onChange={(e) => setQuantity(e.currentTarget.valueAsNumber)}
                    ></input>
                    <button
                      id="deleteItem"
                      value={product.name}
                      onClick={async () => (
                        getQuantityValue(setQuantity),
                        await productDel(props.token, props.orderId, product.id, quantity, setOrder, props.setDisplay!)
                      )}
                    >
                      Delete item(s)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      {/* display clear cart button only for the cart */}
      <div id="clear">
        {order && order.order_date === null && (
          <button id="cart-clear" onClick={async () => await cartClear(props.orderId, props.token, props.setDisplay!)}>
            Clear Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default CartList
