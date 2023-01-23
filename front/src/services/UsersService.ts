import { IUser } from '../tools/Interfaces'
import { api } from './ServiceHelper'

// async function to fecth a user data from the database
export const fetchUserData = async (id: number, token: string) => {
  return await api
    .get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.data)
}

// async funtion to fetch a JWT and user's data from the database to put it in the sessionStorage
export const fetchTokenLogin = async (email: string, password: string) => {
  return await api
    .post('/users/auth/', {
      email: email,
      password: password
    })
    .then((response) => {
      /* respObject {accessToken, user} = response.data */
      const respObject = response.data
      const jwt_token = respObject.accessToken
      const user = respObject.user
      // put token and user.id in sessionStorage
      sessionStorage.setItem('token', jwt_token)
      sessionStorage.setItem('userId', user.id)
      sessionStorage.setItem('role', user.role)
      return user // return user's data
    })
    .catch((error) => {
      alert('Wrong email or password')
    })
}

// async function to creates a user in the database
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  password: string
) => {
  return await api
    .post('/users/register/', null, {
      params: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        phone: phone,
        password: password,
        role: 0
      }
    })
    .then((response) => {
      // fetch the new user's data and a JWT
      fetchTokenLogin(email, password).then((data: IUser) => {
        alert('Registration complete')
        return data // return user's data
      })
    })
    .catch((error) => {
      alert(error.message)
    })
}
