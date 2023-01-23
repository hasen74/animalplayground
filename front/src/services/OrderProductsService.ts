import { api } from './ServiceHelper'

// async function to fecth all orderProducts data the from database
export const fetchAllOrderProductsData = async () => {
  return await api.get('/orderproducts/').then((response) => response.data)
}

// async function to fecth an orderProduct data from the database
export const fetchOrderProductData = async (orderId: number, productId: number) => {
  return await api.get(`/orderproducts/${orderId}&${productId}`).then((response) => response.data)
}

// async function to create an orderProduct with the given parameters in the database
export const createOrderProductData = async (orderId: number, productId: number, quantity: number, token: string) => {
  return await api
    .post('/orderproducts/', null, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        OrderId: orderId,
        ProductId: productId,
        quantity: quantity
      }
    })
    .then((response) => response.data)
}

// async function to update an orderProduct data with given parameters in the database
export const updateOrderProductData = async (orderId: number, productId: number, quantity: number, token: string) => {
  return await api.patch(`/orderproducts/${orderId}&${productId}/`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      quantity: quantity
    }
  })
}

// async function to delete an orderProduct entry in the database
export const deleteOrderProductData = async (token: string, orderId: number, productId: number) => {
  return await api.delete(`/orderproducts/${orderId}&${productId}/`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
