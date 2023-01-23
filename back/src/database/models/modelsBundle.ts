import Category from './Category';
import Order from './Order';
import OrderProduct from './OrderProduct';
import Product from './Product';
import User from './User';

// object including all db models in one => facilitates import
const models = {
	Category,
	Product,
	User,
	Order,
	OrderProduct,
};

export default models;
