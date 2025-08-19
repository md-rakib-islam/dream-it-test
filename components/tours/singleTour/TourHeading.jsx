import TripReview from "@/components/common/TripReview";
import AgentLink from "@/components/AgentLink/AgentLink";

const TourHeading = async ({ data }) => {
  // 🚀 SEO: Generate structured data for breadcrumbs
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tours",
        item: "/tours",
      },
      // {
      //   "@type": "ListItem",
      //   "position": 3,
      //   "name": data?.location,
      //   "item": `/tours/${data?.location?.toLowerCase().replace(/\s+/g, '-')}`
      // },
      // {
      //   "@type": "ListItem",
      //   "position": 4,
      //   "name": data?.name,
      //   "item": `${process.env.NEXT_PUBLIC_SITE_URL}${data?.url || ''}`
      // }
    ],
  };

  // 🚀 SEO: Generate local business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: data?.name,
    description: data?.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: data?.location,
    },
    aggregateRating: data?.reviews && {
      "@type": "AggregateRating",
      reviewCount: data?.reviews,
      ratingValue: "4.5", // You might want to make this dynamic
    },
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${data?.url || ""}`,
    image: data?.slideImg?.[0],
  };

  return (
    <>
      {/* 🚀 SEO: Add structured data */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />

      <header className="col-xl-8">
        {/* 🚀 SEO: Proper heading hierarchy */}
        <h1
          className="text-25 fw-600"
          itemProp="name"
          itemScope
          itemType="https://schema.org/TouristTrip"
        >
          {data?.name}
        </h1>

        <div className="row x-gap-10 y-gap-10 items-center pt-10">
          <div className="col-auto">
            <AgentLink
              href={data?.trip_url ? data?.trip_url : "#"}
              style={{
                cursor: data?.trip_url ? "pointer" : "default",
              }}
              className={`${data?.trip_url ? "text-hover-underline" : ""}`}
              target={data?.trip_url ? "_blank" : ""}
              rel={data?.trip_url ? "noopener noreferrer" : undefined}
              aria-label={
                data?.trip_url
                  ? `View ${data?.name} reviews on external site`
                  : undefined
              }
            >
              <div className="d-flex items-center">
                <div
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <TripReview title={data?.name?.toLowerCase()} />
                  <meta itemProp="reviewCount" content={data?.reviews || "0"} />
                  <meta itemProp="ratingValue" content="4.5" />{" "}
                  {/* Make this dynamic */}
                </div>

                <div className="text-14 text-light-1 ml-10">
                  <span aria-label={`${data?.reviews} customer reviews`}>
                    {data?.reviews} reviews
                  </span>
                </div>
              </div>
            </AgentLink>
          </div>

          <div className="col-auto">
            <div className="row x-gap-10 items-center">
              <div className="col-auto">
                <div className="d-flex x-gap-5 items-center">
                  <i
                    className="icon-placeholder text-16 text-light-1"
                    aria-hidden="true"
                  ></i>
                  <div
                    className="text-15 text-light-1"
                    itemProp="location"
                    itemScope
                    itemType="https://schema.org/Place"
                  >
                    <span itemProp="name">{data?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 SEO: Add hidden structured data for additional info */}
        <div
          style={{ display: "none" }}
          itemScope
          itemType="https://schema.org/TouristTrip"
        >
          <meta itemProp="name" content={data?.name} />
          <meta itemProp="description" content={data?.description} />
          <meta itemProp="duration" content={data?.duration} />
          {data?.price && <meta itemProp="offers" content={data?.price} />}
          <meta itemProp="provider" content="Your Tour Company Name" />
        </div>
      </header>
    </>
  );
};

export default TourHeading;

// old code
// import TripReview from "@/components/common/TripReview";
// import AgentLink from "@/components/AgentLink/AgentLink";
// const TourHeading = async ({ data }) => {
//   // const name = params?.name;

//   // const res = await fetch(`${GET_CONTENT_BY_TITLE}/${params?.name}`);
//   // let data;
//   // if (res.ok) {
//   //   data = await res.json();
//   // }

//   return (
//     <div className="col-xl-8">
//       <h1 className="text-25 fw-600">{data?.name}</h1>
//       <div className="row x-gap-10 y-gap-10 items-center pt-10">
//         <div className="col-auto">
//           <AgentLink
//             href={data?.trip_url ? data?.trip_url : "#"}
//             style={{
//               cursor: data?.trip_url ? "pointer" : "default",
//             }}
//             className={`${data?.trip_url ? "text-hover-underline" : ""}`}
//             target={data?.trip_url ? "_blank" : ""}
//           >
//             <div className="d-flex items-center">
//               <TripReview title={data?.name?.toLowerCase()} />

//               <div className="text-14 text-light-1 ml-10">
//                 {data?.reviews} reviews
//               </div>
//             </div>
//           </AgentLink>
//         </div>

//         <div className="col-auto">
//           <div className="row x-gap-10 items-center">
//             <div className="col-auto">
//               <div className="d-flex x-gap-5 items-center">
//                 <i className="icon-placeholder text-16 text-light-1"></i>
//                 <div className="text-15 text-light-1">{data?.location}</div>
//               </div>
//             </div>

//             {/* <div className="col-auto">
//                       <button
//                         data-x-click="mapFilter"
//                         className="text-blue-1 text-15 underline"
//                       >
//                         Show on map
//                       </button>
//                     </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourHeading;
