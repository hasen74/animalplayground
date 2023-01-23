import { Dispatch, SetStateAction } from 'react'
import { sleep } from '../tools/functions'
import { IOrder, IOrderProduct, IProduct, IUser } from '../tools/Interfaces'
import {
  createOrderProductData,
  deleteOrderProductData,
  fetchOrderProductData,
  updateOrderProductData
} from './OrderProductsService'
import { createOrderData, deleteOrderData, fetchOrderData, updateOrderData } from './OrdersService'
import { fetchProductData } from './ProductsService'

// function to add a product to the cart: it updates or creates an order
export async function productAdd(
  token: string | null | undefined,
  user: IUser | undefined,
  product: IProduct,
  quantity: number
) {
  let notOrderProduct: boolean = true
  let order: IOrder = {
    id: 0,
    total_price: 0,
    order_date: undefined,
    delivery_date: undefined,
    UserId: 0
  }
  // token && user verification => looks if user is logged
  if (token && user) {
    // looks if user have at least one order. If yes: retrieves last order.
    if (user.Orders && user.Orders?.length !== 0) {
      await fetchOrderData(user.Orders[user.Orders.length - 1].id).then((data: IOrder) => {
        order = data
      })
      /* order.id verification => checks if order variable was updated
      and looks if order_date is null (order unpaid)*/
      if (order.id !== 0 && (order.order_date === null || order.order_date === undefined)) {
        // if order_date is null: updates order, then looks if product is already in it
        await updateOrderData(order.id, token, order.total_price + product.price * quantity)
        order.Products?.forEach((element: IProduct) => {
          if (element.id === product.id && element.Order_Product?.quantity) {
            // if product is already in order: updates corresponding orderProduct
            updateOrderProductData(order.id, element.id, element.Order_Product?.quantity + quantity, token)
            notOrderProduct = false
          }
        })
        if (notOrderProduct) {
          // if product is not in order: creates a new orderProduct
          await createOrderProductData(order.id, product.id, quantity, token)
        }
      } else if (order.id !== 0 && order.order_date !== null && order.order_date !== undefined) {
        // if order_date is not null: creates a new order with order_date undefined and a new orderProduct
        await createOrderData(product.price * quantity, user.id, token).then((data) => {
          createOrderProductData(data.id, product.id, quantity, token)
        })
      }
    } else {
      // if user has no order: creates a new order with order_date undefined and a new orderProduct
      await createOrderData(product.price * quantity, user.id, token).then((data) => {
        createOrderProductData(data.id, product.id, quantity, token)
      })
    }
    await sleep(1000) // waits a second to avoid problems with the database
  }
}

// function to delete one or more product(s) from the cart
export async function productDel(
  token: string | null | undefined,
  orderId: number,
  productId: number,
  quantity: number,
  setOrder: Dispatch<SetStateAction<IOrder | undefined>>,
  setDisplay: Dispatch<SetStateAction<boolean>>
) {
  let orderProduct: IOrderProduct = {
    OrderId: 0,
    ProductId: 0,
    quantity: 0
  }
  let order: IOrder = {
    id: 0,
    total_price: 0,
    order_date: undefined,
    delivery_date: undefined,
    UserId: 0
  }
  let product: IProduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    CategoryId: 0
  }
  // token verification
  if (token) {
    // fetchs all necessary data
    await fetchOrderProductData(orderId, productId).then((data: IOrderProduct) => (orderProduct = data))
    await fetchOrderData(orderId).then((data: IOrder) => (order = data))
    await fetchProductData(productId).then((data: IProduct) => {
      product = data
    })
    // If the quantity to delete match orderProduct.quantity: deletes orderProduct entry
    if (orderProduct.quantity <= quantity) {
      await deleteOrderProductData(token, orderId, productId)
    } else {
      // Else updates orderProduct entry
      await updateOrderProductData(orderId, productId, orderProduct.quantity - quantity, token)
    }
    // Then updates order entry or deletes it if there is no more orderProduct
    if (order.total_price - quantity * product.price <= 0) {
      await deleteOrderData(orderId, token)
      setDisplay(false) // changes cart page's display
    } else {
      await updateOrderData(orderId, token, order.total_price - quantity * product.price)
      setOrder(order) // updates order for carlist component's display
    }
  }
}

// function to delete given order entry
export async function cartClear(
  orderId: number,
  token: string | null | undefined,
  setDisplay: Dispatch<SetStateAction<boolean>>
) {
  await deleteOrderData(orderId, token)
  setDisplay(false) // changes cart page's display
}

// function to 'pay' the cart
export async function payCart(
  orderId: number,
  token: string | null | undefined,
  setDisplay: Dispatch<SetStateAction<boolean>>
) {
  // updates order_date columns for the cart
  const order_date: Date = new Date()
  await updateOrderData(orderId, token, undefined, undefined, order_date)
  setDisplay(false) // changes cart page's display
}
