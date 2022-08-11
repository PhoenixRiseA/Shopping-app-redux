import classes from './CartButton.module.css';
import { cartActions } from '../../store/cartReducer';
import {useSelector,useDispatch} from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const showCartHandler = () =>{
    dispatch(cartActions.cartState());
  };

  const numberOfCartItems = useSelector((state)=>state.cart.cartItems.length);
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
