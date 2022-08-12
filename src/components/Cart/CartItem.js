import classes from './CartItem.module.css';
import {useDispatch} from 'react-redux';
import { cartActions } from '../../store/cartReducer';

const CartItem = (props) => {
  const { title, quantity, total, price,id } = props.item;
  
  const dispatch = useDispatch();
  const increaseItemCountHandler = (item) =>{
     dispatch(cartActions.addToCart(item));
  };
  const decreaseItemCountHandler = (item) =>{
     dispatch(cartActions.removeFromCart(item));
  };

  return (
    <li className={classes.item} id={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}{' '}
          <span className={classes.itemprice}>(${+price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseItemCountHandler.bind(null,props.item)}>-</button>
          <button onClick={increaseItemCountHandler.bind(null,props.item)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
