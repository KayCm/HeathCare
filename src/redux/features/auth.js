import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    walletType:'',
    walletAddress:'',
    userName:'',
    userPhone:'',
    userAddress:'',
}

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        saveInfo:(state,action)=>{
            return{...state,
                userName:action.payload.userName,
                userPhone:action.payload.userPhone,
                userAddress:action.payload.userAddress}
        },
        saveWallet:(state,action)=>{


            return{...state,walletType:action.payload.walletType,
                walletAddress:action.payload.walletAddress}
        },
        delInfo:()=>{
            return initialState;
        }
    }
})

export const {saveInfo,saveWallet} = auth.actions;
export default auth.reducer;
