// alls interfaces for data from the database

export interface ICategory {
  id: number
  animal: string
  Products?: {
    id: number
    name: string
    description: string
    price: number
    CategoryId: number
  }[]
}

export interface IProduct {
  id: number
  name: string
  description: string
  price: number
  CategoryId: number
  Category?: {
    id: number
    animal: string
  }
  Order_Product?: {
    quantity: number
    ProductId: number
    OrderId: number
  }
}

export interface IOrder {
  id: number
  total_price: number
  order_date: Date | undefined
  delivery_date: Date | undefined
  UserId: number
  User?: {
    id: number
    first_name: string
    last_name: string
    email: string
    address: string
    phone: string
    password: string | undefined
    role: number | undefined
  }
  Products?: {
    id: number
    name: string
    description: string
    price: number
    CategoryId: number
    Order_Product?: {
      quantity: number
      ProductId: number
      OrderId: number
    }
  }[]
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  address: string
  phone: string
  password?: string
  role?: number
  Orders?: {
    id: number
    total_price: number
    order_date: Date
    delivery_date: Date
    UserId: number
  }[]
}

export interface IOrderProduct {
  OrderId: number
  ProductId: number
  quantity: number
}
