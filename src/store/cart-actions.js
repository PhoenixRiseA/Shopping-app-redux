import { uiActions } from "./uiReducer";
import { cartActions } from "./cartReducer";
export const fetchCartData = () =>{
    return async (dispatch) =>{
        const fetchData = async ()=>{
            const response = await fetch('https://shoppingapp-4aebd-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('fetching data failed!');
            }
            const data = await response.json();
            return data;
        };
        try{
            const cartData = await fetchData();
            console.log(cartData);
            dispatch(cartActions.replaceCart({cartItems:cartData.cartItems || [], totalQuantity: cartData.totalQuantity, totalAmount:cartData.totalAmount}));
        }catch(error){
            dispatch(uiActions.notificationState({
            status:'error',
            title:'Error!',
            message:'fetching cart data failed!'
            }));

        }
    }
}
export const sendCartData = (cart) =>{

    return  async (dispatch)=>{
        dispatch(uiActions.notificationState({
        status:'pending',
        title:'Sending...',
        message:'sending cart data!'
        }));

            const sendRequest = async () =>{
                const response = await fetch('https://shoppingapp-4aebd-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body:JSON.stringify({cartItems:cart.cartItems || [], totalQuantity: cart.totalQuantity, totalAmount:cart.totalAmount}),
        
            });

            if(!response.ok){
                throw new Error('Sending cart data failed');
            }

        };
        try {
            await sendRequest();
            dispatch(uiActions.notificationState({
            status:'success',
            title:'success',
            message:' cart data sent'
        }))

        }catch  (err){
            console.log(err.message);
            dispatch(uiActions.notificationState({
                status: 'error',
                title:'Error!',
                message:'Sending cart Data failed'
            }));
            throw new Error(err.message);
        }

    


    }   
        
    
};
