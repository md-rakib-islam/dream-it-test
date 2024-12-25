"use client";

import dynamic from "next/dynamic";
import Blog from "@/components/blogs/Blog";
import { useContext } from "react";
// import { BlogContext } from "./BlogProvider";
import { LayoutContext } from "@/app/LayoutProvider";

// const fetchMetadata = async () => {
//   try {
//     const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/blog`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch metadata");
//     }
//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//     return {
//       meta_title:
//         "Blogs || Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
//       meta_description:
//         "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
//       image:
//         "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
//     };
//   }
// };

// // Define the generateMetadata function
// export async function generateMetadata() {
//   const metadata = await fetchMetadata();
//   return {
//     title: metadata.meta_title,
//     description: metadata.meta_description,
//     openGraph: {
//       title: metadata.meta_title,
//       description: metadata.meta_description,
//       images: [
//         {
//           url: metadata?.cloudflare_image,
//           width: 100,
//           height: 100,
//           alt: metadata?.meta_title,
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       title: metadata.meta_title,
//       description: metadata.meta_description,
//       image: metadata?.cloudflare_image,
//     },
//   };
// }
const Blogs = () => {
  const { blogs } = useContext(LayoutContext);

  console.log("blogPages", blogs);

  return (
    <>
      <div className="header-margin"></div>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Latest Blog Posts</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Lorem ipsum is placeholder text commonly used in site.
                </p>
              </div>
            </div>
          </div>
          <Blog blogs={blogs.blogs} categories={blogs.categories} />
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(Blogs), { ssr: true });
