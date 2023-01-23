import { api } from './ServiceHelper'

// async function to fecth all categories data from the database
export const fetchAllCategoriesData = async () => {
  return await api.get('/categories/').then((response) => response.data)
}
