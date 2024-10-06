import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCategory: { id: 3, name: "Destinations", number: 0 },
  searchTerm: "",
  blogs: [],
  comments: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    addSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addCategory, addSearchTerm, addBlogs, addComments } =
  blogSlice.actions;
export default blogSlice.reducer;
