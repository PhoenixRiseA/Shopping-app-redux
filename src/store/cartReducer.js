import {createSlice} from '@reduxjs/toolkit';

const initialCartState ={cartItems:[],totalAmount:0, cartIsShown:false};

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        cartState(state){
            state.cartIsShown = !state.cartIsShown;
        },
        addToCart(state,action){
            const index = state.cartItems.findIndex((item)=>item.id===action.payload.id);
            console.log('index of item to add',index);
            const existingCartItem = state.cartItems[index];
            console.log("the existing cartItem is: ", existingCartItem);
            let updatedItems;
            if(index>-1 && +existingCartItem.quantity >=0){
                console.log("item exists");
                const updatedItem = {...existingCartItem, quantity: (existingCartItem.quantity = +existingCartItem.quantity + 1)};
                updatedItems = [...state.cartItems];
                updatedItems[index] = updatedItem;
                state.totalAmount += +updatedItem.price;
                console.log("totalAmount", state.totalAmount);


            }else{
                state.totalAmount += +action.payload.price * +action.payload.quantity;
                state.cartItems = [...state.cartItems,action.payload];
            }
            
        },
        removeFromCart(state,action){
            const index = state.cartItems.findIndex((item)=> item.id===action.payload.id);
            console.log("index of item to remove/reduce", index);
            const existingCartItem = state.cartItems[index];
            console.log("the existing cart item", existingCartItem);
            let updatedItems;
            if(index>-1 && +existingCartItem.quantity>1){
                const updatedItem = {
                    ...existingCartItem, quantity:(existingCartItem.quantity = +existingCartItem.quantity-1)
                }
                updatedItems = [...state.cartItems];
                updatedItems[index] = updatedItem;
                state.totalAmount -= updatedItem.price;
            }else{
                let changeItems = [...state.cartItems];
                updatedItems = [...changeItems.slice(0,index),...changeItems.slice(index+1,state.cartItems.length)];
                state.cartItems = [...updatedItems];
                state.totalAmount = state.totalAmount - +existingCartItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;