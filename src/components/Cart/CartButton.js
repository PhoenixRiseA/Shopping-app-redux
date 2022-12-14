import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiReducer';
import {useSelector,useDispatch} from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const showCartHandler = () =>{
    dispatch(uiActions.cartState());
  };

  const numberOfCartItems = useSelector((state)=>state.cart.totalQuantity);
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
