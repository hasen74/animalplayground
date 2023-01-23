import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductHome from '../components/Product'
import Footer from '../components/Footer'
import { fetchAllCategoriesData } from '../services/CategoriesService'
import { ICategory } from '../tools/Interfaces'

const HomePage: NextPage = () => {
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([])
  const [productDisplay, setProductDisplay] = useState<string>('Dog')

  //fetchs all categories data when page is loaded
  useEffect(() => {
    fetchAllCategoriesData().then((data) => {
      setCategoriesData(data)
    })
  }, [])

  return (
    <div className="container">
      <Navbar />
      <div id="main">
        <div className="categories">
          {categoriesData &&
            categoriesData.map((category, i) => {
              return (
                <div key={category.id}>
                  <button onClick={() => setProductDisplay(category.animal)}>{category.animal}</button>
                </div>
              )
            })}
        </div>
        <ProductHome category={productDisplay} />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
