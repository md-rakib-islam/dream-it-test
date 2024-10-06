import { useGetBlogsAllWithPaginationQuery } from "@/features/content/contentApi";
// import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
// import getMonthDayYear from "@/utils/date";

const useBlogs = () => {
  const {
    isSuccess: isContentSuccess,
    data: contentItems,
    isLoading: isBlogContentLoading,
  } = useGetBlogsAllWithPaginationQuery();
  // const { isSuccess, data, isLoading } = useGetImagesByMenuIdQuery(blogId);

  let blogPosts = [];
  if (isContentSuccess) {
    blogPosts = contentItems?.blogs.map((item) => ({
      id: item.id,
      cloudflare_image: item?.cloudflare_image,
      title: item.title,
      date: item?.date,
      delayAnimation: "200",
      details: item.description,
      short_des: item?.short_des,
      tag: "art",
      tags: ["adventure_travel", "food_drink"],
      created_at: item?.created_at,
      category: item?.category,
    }));
  }
  return blogPosts;
};

export default useBlogs;
