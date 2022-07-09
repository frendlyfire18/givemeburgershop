import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    goods: [],
};

const compareStrings = (id_1,id_2) => id_1.includes(id_2)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment:(state, action)=>{
            let newArr=new Array();
            state.goods.forEach((good,value)=>{
                newArr[value] = good
                if(good.id===action.payload.id){
                    good.num += 1;
                    newArr[value] = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
        decrement:(state, action)=>{
            let newArr=new Array();
            state.goods.forEach((good,value)=>{
                newArr[value] = good
                if(good.id===action.payload.id){
                    if(good.num>1)
                        good.num -= 1;
                        newArr[value] = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
        addToCart: (state, action) => {
            let isInArray = false;
            let newArr = new Array();
            state.goods.forEach((good,value)=>{
                if(good.id===action.payload.id){
                    good.num += 1;
                    newArr[value] = good
                    isInArray = true
                }
                newArr[value] = good
            })
            if(isInArray){
                // @ts-ignore
                state.goods = newArr
            }else{
                state.goods.push(action.payload);
            }
        },
        deleteFromCart: (state, action) => {
            let newArr= new Array();
            state.goods.forEach((good,value)=>{
                if(good.id!==action.payload.id){
                    newArr[value] = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
    },
});
export const {
    addToCart,
    deleteFromCart,
    increment,
    decrement
} = cartSlice.actions;

export const selectCart = (state) => state.counter.goods;

export default cartSlice.reducer;