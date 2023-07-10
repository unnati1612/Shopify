import { createSlice } from "@reduxjs/toolkit"

const initialState={
    loggedIn: false,
  
}

const loginSlice= createSlice({
    name: 'login',
    initialState,
    reducers:{
        getLoginStatus:(state)=>{
            state.loggedIn=localStorage.getItem('isLoggedIn')
            // console.log("logged in",state.loggedIn)
        },
        
    }
})

export const {getLoginStatus}=loginSlice.actions
export default loginSlice.reducer;