import { CREATE_CMS_BLOG_COMMENTS } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const blogCommentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlogComment: builder.mutation({
      query: (data) => ({
        url: CREATE_CMS_BLOG_COMMENTS,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBlogCommentMutation } = blogCommentApi;
