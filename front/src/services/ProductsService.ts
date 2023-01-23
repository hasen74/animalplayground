import { api } from './ServiceHelper'

// async function to fecth all products data the from database
export const fetchAllProductsData = async () => {
  return await api.get('/products/').then((response) => response.data)
}

// async function to fecth a product data from the database
export const fetchProductData = async (id: number) => {
  return await api.get(`/products/${id}`).then((response) => response.data)
}

// async function to add a product
export const addProduct = async (
  token: string,
  name: string,
  description: string,
  price: string,
  CategoryId: string
) => {
  return await api
    .post('/products/', null, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        name: name,
        description: description,
        price: price,
        CategoryId: CategoryId
      }
    })
    .then((response) => {
      return response.data // return product's data
    })
    .catch((error) => {
      alert(error.message)
    })
}

export const deleteProduct = async (token: string, id: string) => {
  return await api
    .delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      return response.data // return deleted product's data
    })
    .catch((error) => {
      alert(error.message)
    })
}
