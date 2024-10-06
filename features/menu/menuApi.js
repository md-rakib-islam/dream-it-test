import { GET_MENUS_ALL_NESTED } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const menuApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAllMenu : builder.query({
            query : () => ({
                url : GET_MENUS_ALL_NESTED,
                method : 'GET'
            })
        })
    })
});

export const {useGetAllMenuQuery} = menuApi;