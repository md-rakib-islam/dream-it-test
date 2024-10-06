import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue : "",
    location : "",
};

export const searchSlice = createSlice({
    name : 'search',
    initialState,
    reducers : {
        addSearchValue : (state, action) => {
            state.searchValue = action.payload
        },
        addLocation : (state, action) => {
            state.location = action.payload
        }
    }
});

export const {addSearchValue, addLocation} = searchSlice.actions;
export default searchSlice.reducer;