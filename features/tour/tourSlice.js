import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tourItem : {},
    itenarayItems : [],
};

export const tourSlice = createSlice({
    name : 'tour',
    initialState,
    reducers : {
        addtourItem : (state, action) => {
            state.tourItem = action.payload
        },
        addItenarayItems : (state, action) => {
            state.itenarayItems = action.payload
        }
    }
});

export const {addtourItem, addItenarayItems} = tourSlice.actions;
export default tourSlice.reducer;