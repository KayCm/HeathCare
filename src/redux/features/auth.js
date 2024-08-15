import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    shopingName:'',
    shopingPhone:'',
    shopingAddress:'',
    address:"",
    address_of_receipt:"",
    code:"",
    discord:"",
    email:"",
    is_concerned:false,
    link:"",
    mobile:"",
    telegram:"",
    time:"",
    twitter:"",
    token:'',
    walletType:'',
    walletAddress:'',
    walletChain:''
}

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        saveUserInfo:(state,action)=>{
            return {...state,...action.payload}
        },
        saveInfo:(state,action)=>{
            return{...state,
                shopingName:action.payload.userName,
                shopingPhone:action.payload.userPhone,
                shopingAddress:action.payload.userAddress}
        },
        saveWallet:(state,action)=>{
            return{...state,walletType:action.payload.walletType,walletChain:action.payload.walletChain,
                walletAddress:action.payload.walletAddress}
        },
        delInfo:()=>{
            return initialState;
        }
    }
})

export const {saveInfo,saveWallet,saveUserInfo,delInfo} = auth.actions;
export default auth.reducer;
