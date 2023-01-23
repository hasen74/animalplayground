import { api } from './ServiceHelper'

// async function to fecth all orders data the from database
export const fetchAllOrdersData = async () => {
  return await api.get('/orders/').then((response) => response.data)
}

// async function to fecth an order data from the database
export const fetchOrderData = async (id: number) => {
  return await api.get(`/orders/${id}`).then((response) => response.data)
}

// async function to create an order with the given parameters in the database
export const createOrderData = async (
  total_price: number,
  UserId: number,
  token: string,
  order_date?: Date,
  delivery_date?: Date
) => {
  return await api
    .post('/orders/', null, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        total_price: total_price,
        order_date: order_date,
        delivery_date: delivery_date,
        UserId: UserId
      }
    })
    .then((response) => response.data)
}

// async function to update an order data with given parameters in the database
export const updateOrderData = async (
  id: number,
  token: string | null | undefined,
  total_price?: number,
  UserId?: number,
  order_date?: Date,
  delivery_date?: Date
) => {
  return await api.patch(`/orders/${id}/`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      total_price: total_price,
      order_date: order_date,
      delivery_date: delivery_date,
      UserId: UserId
    }
  })
}

// async function to delete an order entry in the database
export const deleteOrderData = async (id: number, token: string | undefined | null) => {
  return await api
    .delete(`orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.data)
}
