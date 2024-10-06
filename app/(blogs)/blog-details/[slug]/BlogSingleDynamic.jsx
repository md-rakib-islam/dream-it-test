"use client";
import BlogSidebar from "@/components/blog/blog-sidebar";
import Comments from "@/components/blog/blog-details/Comments";
import FormReply from "@/components/blog/blog-details/FormReply";
import RelatedBlog from "@/components/blog/blog-details/RelatedBlog";
import TopComment from "@/components/blog/blog-details/TopComment";
import LocationTopBar from "@/components/common/LocationTopBar";
import {
  useGetBlogContentsByBlogTitleQuery,
  useGetCommentByBlogIdQuery,
} from "@/features/content/contentApi";
import { Interweave } from "interweave";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import SingleBlogSkeleton from "@/components/skeleton/SingleBlogSkeleton";
import { useEffect } from "react";
import { addComments } from "@/features/blog/blogSlice";
import formatDate from "@/utils/dateFormate";

const BlogSingleDynamic = ({ params }) => {
  const title = params.slug;
  const dispatch = useDispatch();

  const { currentPage, PageSize } = useSelector((state) => state.pagination);

  const { isSuccess, data, isLoading } =
    useGetBlogContentsByBlogTitleQuery(title);

  const {
    isSuccess: isCommentSuccess,
    data: commentData,
    isLoading: commentLoading,
  } = useGetCommentByBlogIdQuery(title);

  let blogItem = {};

  if (isSuccess) {
    blogItem = {
      id: data.id,
      img: data?.cloudflare_image || null,
      title: data?.title,
      date: formatDate(data?.created_at),
      delayAnimation: "100",
      details: data?.description,
      tag: "art",
      tags: ["adventure_travel", "food_drink"],
    };
  }

  useEffect(() => {
    if (commentData) {
      dispatch(addComments(commentData));
    } else {
      dispatch(addComments([]));
    }
  }, [commentData, dispatch]);

  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* <DefaultHeader /> */}
      {/* End Header 1 */}

      <LocationTopBar />
      {/* End location top bar section */}

      {isLoading ? (
        <SingleBlogSkeleton />
      ) : (
        <>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-40 ">
                <div className="col-xl-9 col-lg-9 layout-pt-md">
                  <div className="text-15 fw-500 text-blue-1 mb-8 text-capitalize  text-center">
                    {blogItem?.tag}
                  </div>
                  <h1 className="text-30 fw-600">{blogItem?.title}</h1>
                  <div className="text-15 text-light-1 mt-10">
                    {blogItem?.date}
                  </div>
                  <div className="col-12">
                    <Image
                      src={blogItem?.img}
                      // className="col-12 rounded-4 destination_banner_img"
                      height={400}
                      width={1920}
                      className="col-12 rounded-4 w-100 img_large_details"
                    />
                  </div>

                  <Interweave
                    allowAttributes
                    allowElements
                    disableLineBreaks={false}
                    content={blogItem.details}
                  />
                  {/* <DetailsContent /> */}
                  {/* Details content */}

                  {/* <div className="border-top-light border-bottom-light py-30 mt-30">
                    <TopComment />
                  </div> */}
                  {/* End  topcommnet  */}
                  {/* <div className="border-bottom-light py-30">
                    <BlogNavigator />
                  </div> */}
                  {/* End BlogNavigator */}

                  {/* <h2 className="text-22 fw-500 mb-15 pt-30">Comments</h2>
                  <Comments blogId={title} /> */}
                  {/* End comments components */}
                </div>
                <div className="col-xl-3">
                  <BlogSidebar blogId={blogItem.id} />
                </div>
              </div>
              {/* End .row top bar image and title */}

              {/* <div className="row y-gap-30">
                <div className="col-xl-9 col-lg-9 layout-pt-md">
                  <div className="border-top-light pt-40 mt-40" />

                  <div className="row">
                    <div className="col-auto">
                      <h3 className="text-22 fw-500">Leave a Reply</h3>
                      <p className="text-15 text-dark-1 mt-5">
                        Your email address will not be published.
                      </p>
                    </div>
                  </div>

                  <FormReply blogId={blogItem.id} blogTitle={title} />
                </div>

                
              </div> */}
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
          {/* Details Blog Details Content */}
        </>
      )}
    </>
  );
};

export default BlogSingleDynamic;
