"use client";

import { memo } from "react";

const TourProductsSchema = memo(function TourProductsSchema() {
  // Create the schema object for tour products
  const tourProductsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/rome-colosseum-roman-forum-and-palatine-hills-ticket-with-hosted-entry",
        name: "Rome Colosseum, Roman Forum & Palatine Hills Ticket",
        description:
          "Skip-the-line hosted entry ticket for Rome's iconic Colosseum and ancient ruins.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/rome-colosseum-roman-forum-and-palatine-hills-ticket-with-hosted-entry",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "215",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Emily R",
          },
          reviewBody:
            "Amazing tour experience with easy access and great coordination!",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/vatican-museum-and-sistine-chapel-hosted-entry-ticket",
        name: "Vatican Museum and Sistine Chapel Ticket",
        description:
          "Fast-track entry ticket to the Vatican Museums and Sistine Chapel.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/vatican-museum-and-sistine-chapel-hosted-entry-ticket",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "180",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "James K",
          },
          reviewBody: "Fast and smooth entry, totally worth it!",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/capri-island-day-tour-from-naples",
        name: "Capri Island Day Tour from Naples",
        description:
          "Experience the magical island of Capri with round-trip transport from Naples.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/capri-island-day-tour-from-naples",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "145",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Sophia L",
          },
          reviewBody: "One of the best experiences ever! Capri was stunning.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/florence-city-tour-with-academia-gallery-ticket",
        name: "Florence City Tour with Accademia Gallery Ticket",
        description:
          "Discover Florence's top sights and see Michelangelo's David with a priority ticket.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/florence-city-tour-with-academia-gallery-ticket",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "124",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 4",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/venice-gondola-ride-ticket-with-canal-tour",
        name: "Venice Gondola Ride Ticket with Canal Tour",
        description:
          "Romantic gondola ride through Venice's famous canals with guided commentary.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/venice-gondola-ride-ticket-with-canal-tour",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "125",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 5",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/milan-duomo-and-city-center-walking-tour",
        name: "Milan Duomo and City Center Walking Tour",
        description:
          "Explore Milan's majestic Duomo and lively center with a guided walking tour.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/milan-duomo-and-city-center-walking-tour",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "126",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 6",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/pompeii-and-mount-vesuvius-day-trip-from-rome",
        name: "Pompeii and Mount Vesuvius Day Trip from Rome",
        description:
          "Step back in time at Pompeii and hike Mount Vesuvius on a full-day trip.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/pompeii-and-mount-vesuvius-day-trip-from-rome",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 7",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id": "https://dreamtourism.it/tours/amalfi-coast-tour-from-naples",
        name: "Amalfi Coast Tour from Naples",
        description:
          "Enjoy the stunning views of the Amalfi Coast on a guided day tour from Naples.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/amalfi-coast-tour-from-naples",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "128",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 8",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/paris-eiffel-tower-skip-the-line-entry",
        name: "Paris Eiffel Tower Skip-the-Line Entry",
        description:
          "Skip the long lines and enjoy quick access to the Eiffel Tower in Paris.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/paris-eiffel-tower-skip-the-line-entry",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "129",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 9",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/amsterdam-canal-cruise-with-audio-guide",
        name: "Amsterdam Canal Cruise with Audio Guide",
        description:
          "Relax on a scenic cruise through Amsterdam's famous canals with informative audio.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/amsterdam-canal-cruise-with-audio-guide",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "130",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 10",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/brussels-city-tour-and-chocolate-tasting",
        name: "Brussels City Tour and Chocolate Tasting",
        description:
          "Discover Brussels and enjoy tastings of world-famous Belgian chocolate.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/brussels-city-tour-and-chocolate-tasting",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "131",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 11",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/geneva-lake-cruise-and-old-town-walking-tour",
        name: "Geneva Lake Cruise and Old Town Walking Tour",
        description:
          "See Geneva from land and water with this cruise and guided tour combo.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/geneva-lake-cruise-and-old-town-walking-tour",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "132",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 12",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id": "https://dreamtourism.it/tours/lucerne-mount-pilatus-day-trip",
        name: "Lucerne Mount Pilatus Day Trip",
        description:
          "Take an unforgettable trip from Lucerne to the top of Mount Pilatus.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/lucerne-mount-pilatus-day-trip",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "133",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 13",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/berlin-wall-and-historical-city-walking-tour",
        name: "Berlin Wall and Historical City Walking Tour",
        description:
          "Walk through Berlin's history from the Cold War to today with an expert guide.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/berlin-wall-and-historical-city-walking-tour",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "134",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 14",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/munich-city-tour-with-english-speaking-guide",
        name: "Munich City Tour with English-Speaking Guide",
        description:
          "See Munich's landmarks and culture in a guided tour perfect for first-timers.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/munich-city-tour-with-english-speaking-guide",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "135",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 15",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/nice-french-riviera-sunset-cruise",
        name: "Nice French Riviera Sunset Cruise",
        description:
          "Relax on a breathtaking sunset cruise along the stunning French Riviera coast.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/nice-french-riviera-sunset-cruise",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "136",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 16",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
      {
        "@type": "Product",
        "@id":
          "https://dreamtourism.it/tours/rome-night-walking-tour-with-local-guide",
        name: "Rome Night Walking Tour with Local Guide",
        description:
          "Discover Rome's charm at night with a local guide through historic landmarks.",
        brand: {
          "@type": "Organization",
          name: "Dream Tourism IT",
        },
        url: "https://dreamtourism.it/tours/rome-night-walking-tour-with-local-guide",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "137",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          author: {
            "@type": "Person",
            name: "Tourist 17",
          },
          reviewBody: "Fantastic experience! Highly recommended tour.",
        },
      },
    ],
  };

  // Render the product schema as a script tag
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(tourProductsSchema),
      }}
    />
  );
});

export default TourProductsSchema;
