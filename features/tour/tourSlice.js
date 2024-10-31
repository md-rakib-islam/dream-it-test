import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tourItem : {},
    itenarayItems : [],
    filterTours: [],
    filterCategory: '',
    priceRange: {},
};

export const tourSlice = createSlice({
    name : 'tour',
    initialState,
    reducers : {
        addtourItem : (state, action) => {
            state.tourItem = action.payload
        },
        addFiltertourItems : (state, action) => {
            state.filterTours = action.payload
        },
        addCategory : (state, action) => {
            state.filterCategory = action.payload
        },
        addPriceRange: (state, action) => {
            state.priceRange = action.payload
        },
        addItenarayItems : (state, action) => {
            state.itenarayItems = action.payload
        }
    }
});

export const {addtourItem, addItenarayItems, addFiltertourItems,addCategory, addPriceRange} = tourSlice.actions;
export default tourSlice.reducer;