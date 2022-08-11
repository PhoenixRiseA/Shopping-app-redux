import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cartReducer';
import {useDispatch} from 'react-redux';
const ProductItem = (props) => {
  const dispatch = useDispatch();
  
  const { title, price, description, key,id } = props.item;
  
  const addToCartHandler =()=>{
    dispatch(cartActions.addToCart(props.item));
  };

  return (
    <li className={classes.item} key={key} id={id}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${+price}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
