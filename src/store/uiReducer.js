import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {cartIsShown:false,notification:null};

const uiSlice = createSlice({
    name:'ui',
    initialState:initialUiState,
    reducers:{
        cartState(state){
            state.cartIsShown = !state.cartIsShown;
        },
        notificationState(state,action){
            state.notification = {status:action.payload.status,title: action.payload.title, message: action.payload.message};
        },
        removeNotification(state){
            state.notification=null;
        }
        
    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;