import {
  GET_CMS_BLOGS,
  GET_CMS_BLOG_BY_TITLE,
  GET_CMS_BLOG_COMMENTS_BY_BLOG_ID,
  GET_CONTENTS,
  GET_CONTENTS_BY_MENU_CONTENT_ID,
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_CONTENT_BY_TITLE,
  GET_ITENARIES_BY_CONTENT_ID,
} from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContent: builder.query({
      query: (menuId) => ({
        url: `${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${menuId}`,
        method: "GET",
      }),
    }),
    getAllBlogContents: builder.query({
      query: (blogId) => ({
        url: `${GET_CONTENTS}/${blogId}`,
        method: "GET",
      }),
    }),
    getContentsByMenuContentId: builder.query({
      query: (menuContentId) => ({
        url: `${GET_CONTENTS_BY_MENU_CONTENT_ID}/${menuContentId}`,
        method: "GET",
      }),
    }),
    getContentsByMenuContentTitle: builder.query({
      query: (menuContentTitle) => ({
        url: `${GET_CONTENT_BY_TITLE}/${menuContentTitle}`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
    }),
    getItenariesByMenuContentId: builder.query({
      query: (menuContentId) => ({
        url: `${GET_ITENARIES_BY_CONTENT_ID}/${menuContentId}`,
        method: "GET",
      }),
    }),
    getBlogsAllWithPagination: builder.query({
      query: () => ({
        url: `${GET_CMS_BLOGS}`,
        method: "GET",
      }),
    }),
    getBlogContentsByBlogTitle: builder.query({
      query: (blogId) => ({
        url: `${GET_CMS_BLOG_BY_TITLE}/${blogId}`,
        method: "GET",
      }),
    }),
    getCommentByBlogId: builder.query({
      query: (blogId) => ({
        url: `${GET_CMS_BLOG_COMMENTS_BY_BLOG_ID}/${blogId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllContentQuery,
  useGetAllBlogContentsQuery,
  useGetContentsByMenuContentIdQuery,
  useGetItenariesByMenuContentIdQuery,
  useGetContentsByMenuContentTitleQuery,
  useGetBlogsAllWithPaginationQuery,
  useGetBlogContentsByBlogTitleQuery,
  useGetCommentByBlogIdQuery,
} = contentApi;
