import { GET_ALL_REVIEWS } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: GET_ALL_REVIEWS,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewsApi;
