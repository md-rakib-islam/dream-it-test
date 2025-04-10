"use client";

import { memo } from "react";

const ReviewsSchema = memo(function ReviewsSchema() {
  // Create the schema object for reviews
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: "Dream Tourism IT",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "16",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "ManonHoope",
        },
        datePublished: "2024-02-10",
        reviewBody: "Great customer service!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ginna L",
        },
        datePublished: "2024-02-09",
        reviewBody: "It was all great, contact was good.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "4fiona69",
        },
        datePublished: "2024-02-08",
        reviewBody: "Great and easy experience!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "chatterbes1",
        },
        datePublished: "2024-02-07",
        reviewBody: "The antiquities are beyond words amazing.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Craig",
        },
        datePublished: "2024-02-06",
        reviewBody: "Very happy with the whole procedure.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "jlach20162019",
        },
        datePublished: "2024-02-05",
        reviewBody: "Great time! Would definitely use again.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Peter W",
        },
        datePublished: "2024-02-04",
        reviewBody: "Amazing experience, very helpful guide.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "mark w",
        },
        datePublished: "2024-02-03",
        reviewBody: "Thank you for sorting things out at the last minute.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "ManonHoope",
        },
        datePublished: "2024-02-02",
        reviewBody: "Great customer service!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ginna L",
        },
        datePublished: "2024-02-01",
        reviewBody: "It was all great, contact was good.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "4fiona69",
        },
        datePublished: "2024-01-31",
        reviewBody: "Great and easy experience!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "chatterbes1",
        },
        datePublished: "2024-01-30",
        reviewBody: "The antiquities are beyond words amazing.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Craig",
        },
        datePublished: "2024-01-29",
        reviewBody: "Very happy with the whole procedure.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "jlach20162019",
        },
        datePublished: "2024-01-28",
        reviewBody: "Great time! Would definitely use again.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Peter W",
        },
        datePublished: "2024-01-27",
        reviewBody: "Amazing experience, very helpful guide.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "mark w",
        },
        datePublished: "2024-01-26",
        reviewBody: "Thank you for sorting things out at the last minute.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewsSchema),
      }}
    />
  );
});

export default ReviewsSchema;
