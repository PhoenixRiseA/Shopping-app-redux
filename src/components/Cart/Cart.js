import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector((state)=>state.cart.cartItems);
  console.log(cartItems);
  const cartList = cartItems.map((item)=>(<CartItem
          item={{ title: item.title, quantity: item.quantity, total: +item.quantity * +item.price, price: item.price, id:item.id }}
        />))
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartList}
        
      </ul>
    </Card>
  );
};

export default Cart;
