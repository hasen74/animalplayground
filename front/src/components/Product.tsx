import { useEffect, useState } from 'react'
import { productAdd } from '../services/CartServices'
import { fetchAllProductsData } from '../services/ProductsService'
import { fetchUserData } from '../services/UsersService'
import { getQuantityValue } from '../tools/functions'
import { IProduct, IUser } from '../tools/Interfaces'
import Image from 'next/image'
import Router from 'next/router'

// Component to display product's data

function ProductHome(props: { category: string }) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [user, setUser] = useState<IUser>()
  const [token, setToken] = useState<string | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // function to add a product to the cart
  async function updateCart(product: IProduct) {
    if (user && token) {
      setIsLoading(true) // disables add button during the process
      getQuantityValue(setQuantity) // gets quantity value
      await fetchUserData(user.id, token).then((data) => {
        setUser(data)
      }) // gets user's actual data
      await productAdd(token, user, product, quantity) // adds given product to the user's cart
      setIsLoading(false) // button is no longer disabled
      Router.push('/cart')
    } else {
      // if user is not logged: asks for user to login
      Router.push('/account')
      alert('You need to be connected')
    }
  }

  // when the page is loaded
  useEffect(() => {
    // gets JWT and userId from sessionStorage
    const token = sessionStorage.getItem('token')
    const userId = Number(sessionStorage.getItem('userId'))
    // if user is logged (JWT & userId): fetchs user's data
    if (userId && token) {
      setToken(token)
      fetchUserData(userId, token).then((data) => {
        setUser(data)
      })
    }
    // fetchs all products data
    fetchAllProductsData().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className="products">
      {/* .map to display each element of products[] */}
      {products.map((product: IProduct) => {
        // displays only products with the given category
        if (props.category === product.Category?.animal) {
          return (
            <div key={product.name} className="items">
              <div className="info">
                <div className="titles">{product.name}</div>
                <div>"{product.description}"</div>
                <div className="price">{product.price}€</div>
                <div id="product-add">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    defaultValue={1}
                    min="1"
                    max="100"
                    onChange={(element) => setQuantity(element.currentTarget.valueAsNumber)}
                  ></input>
                  <button value={product.name} onClick={async () => await updateCart(product)} disabled={isLoading}>
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="img-container">
                {/* displays corresponding image */}
                {product.name === 'The PikaChew' && (
                  <Image src={require('./pikachu.jpg')} alt="logo" className="product-image" />
                )}
                {product.name === 'The CleopatRat Teaser' && (
                  <Image src={require('./rat.jpg')} alt="logo" className="product-image" />
                )}
                {product.name === 'The Choker' && (
                  <Image src={require('./hamster.jpg')} alt="logo" className="product-image" />
                )}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default ProductHome
