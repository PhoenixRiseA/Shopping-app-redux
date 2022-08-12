import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
// import {uiActions} from './store/uiReducer';
import {useDispatch} from 'react-redux';
import {sendCartData, fetchCartData} from './store/cart-actions';
let isInitial = true;
function App() {
  
  const cartIsShown = useSelector((state)=>state.ui.cartIsShown);
  console.log(cartIsShown);
  const cart = useSelector((state)=>state.cart);
  
  // const notificationIsShown = useSelector((state)=>state.ui.notificationIsShown);
  
  const dispatch = useDispatch();
  
  // const exitSendCartStateHandler = () =>{
  //   dispatch(uiActions.changeNotificationState());
  // };

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);
  
  useEffect(()=>{
    if(isInitial){
      isInitial=false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    

    
  },[cart,dispatch]);

const notification = useSelector((state)=>state.ui.notification);
  return (
    <Fragment>
      {notification && <Notification
        title={notification.title} status={notification.status} message={notification.message}
      />}
    <Layout >
      {cartIsShown && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
