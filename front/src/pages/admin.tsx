import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { addProduct, deleteProduct } from '../services/ProductsService'
import Router from 'next/router'

const AdminPage: NextPage = () => {

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [id, setId] = useState<string>('')

  // condition to block registration if information missing
  const registerIsEnabled = name.length > 0 && description.length > 0 && price.length > 0 && categoryId.length > 0
  // condition to block deletion if id missing
  const registerDeleteIsEnabled = id.length !== 0

  // checks admin rights from session storage to display page, displays 'unauthorized' otherwise
  useEffect(() => {
    const role = Number(sessionStorage.getItem('role'))
    if (!role) {
      alert('Unauthorized')
      Router.push('/')
    } else if (role !== 1) {
      alert('Unauthorized')
      Router.push('/')
    }
  }, [])

  // function to pass form data to the addProduct service function
  const handleProductAdd = async (event: any) => {
    event.preventDefault() //prevents page refresh

    //gets token from session storage
    const token = sessionStorage.getItem('token')

    if (token) {
      await addProduct(token, name, description, price, categoryId)
        .then((data) => {
          const productId = data.id
          alert(`Product added with id #${productId}`)
        })
        .catch((error) => {
          alert(error)
        })
      setName('')
      setDescription('')
      setPrice('')
      setCategoryId('')
    }
    Router.push('/')
  }

  const handleProductDelete = async (event: any) => {
    event.preventDefault() //prevents page refresh

    //gets token from session storage
    const token = sessionStorage.getItem('token')

    if (token) {
      await deleteProduct(token, id).then(() => {
        alert(`Product id #${id} deleted`)
      })
      setId('')
    }
    Router.push('/')
  }

  return (
    <div className="container">
      <Navbar />
      <div id="main">
        <div id="register">
          <div>Enter new production information:</div>
          <p></p>
          <form onSubmit={handleProductAdd}>
            <ul>
              <li>
                <label htmlFor="name">Name:</label>
              </li>
              <li>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </li>
              <li>
                <label htmlFor="description">Description:</label>
              </li>
              <li>
                {' '}
                <input
                  type="text"
                  name="description"
                  id="description"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
              </li>
              <li>
                {' '}
                <label htmlFor="price">Price:</label>
              </li>
              <li>
                {' '}
                <input
                  type="string"
                  name="price"
                  id="price"
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
                />
              </li>
              <li>
                {' '}
                <label htmlFor="categoryId">Category ID:</label>
              </li>
              <li>
                {' '}
                <input
                  type="string"
                  name="categoryId"
                  id="categoryId"
                  onChange={(event) => setCategoryId(event.target.value)}
                  value={categoryId}
                />
              </li>
            </ul>
            <button disabled={!registerIsEnabled}>Add product</button>
          </form>
          <p></p>
          <form onSubmit={handleProductDelete}>
            <ul>
              <li>
                <label htmlFor="id">Delete product #ID:</label>
              </li>
              <li>
                <input type="text" name="id" id="id" onChange={(event) => setId(event.target.value)} value={id} />
              </li>
              <button disabled={!registerDeleteIsEnabled}>Delete product</button>
            </ul>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage
