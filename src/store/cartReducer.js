import {createSlice} from '@reduxjs/toolkit';


const initialCartState ={cartItems:[],totalAmount:0,totalQuantity:0,changed:false};

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        replaceCart(state,action){
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
            state.cartItems = action.payload.cartItems;
        },
        addToCart(state,action){
            state.totalQuantity++;
            const index = state.cartItems.findIndex((item)=>item.id===action.payload.id);
            console.log('index of item to add',index);
            const existingCartItem = state.cartItems[index];
            console.log("the existing cartItem is: ", existingCartItem);
            let updatedItems;
            state.changed = true;
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
            state.totalQuantity -= 1;
            const index = state.cartItems.findIndex((item)=> item.id===action.payload.id);
            console.log("index of item to remove/reduce", index);
            const existingCartItem = state.cartItems[index];
            console.log("the existing cart item", existingCartItem);
            let updatedItems;
            state.changed = true;
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