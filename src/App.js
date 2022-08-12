import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import {uiActions} from './store/uiReducer';
import {useDispatch} from 'react-redux';
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
    if(isInitial){
      isInitial=false;
      return;
    }
    dispatch(uiActions.notificationState({
      status:'pending',
      title:'Sending...',
      message:'sending cart data!'
    }));

    fetch('https://shoppingapp-4aebd-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify({cart}),
      
    }).then((res)=>{
      if(res.ok){
        return res.json();
        
      }
    }).then((data)=>{
      console.log(data);
      dispatch(uiActions.notificationState({
        status:'success',
        title:'success',
        message:' cart data sent'
      }))
    }).catch((err)=>{
      console.log(err.message);
      dispatch(uiActions.notificationState({
        status: 'error',
        title:'Error!',
        message:'Sending cart Data failed'
      }));
      throw new Error(err.message);
    })
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
