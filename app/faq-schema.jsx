"use client";

import { memo } from "react";

const FAQSchema = memo(function FAQSchema() {
  // Create the schema object for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Dream Tourism?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dream Tourism is a tour operator specializing in guided and self-guided tours across Italy, France, Switzerland, Germany, Belgium, and the Netherlands, offering curated experiences for travelers.",
        },
      },
      {
        "@type": "Question",
        name: "What type of tours does Dream Tourism offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dream Tourism offers:\n\nAttraction Tours (e.g., Colosseum, Vatican Museums, Eiffel Tower)\nDay Tours (e.g., Florence & Pisa from Rome, Capri from Naples)\nMulti-Day Tours (e.g., Switzerland, France, Austria, and Liechtenstein)\nLuxury Private Tours",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a tour with Dream Tourism?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book a tour directly on our website by selecting your preferred package, choosing a date, and completing payment online.",
        },
      },
      {
        "@type": "Question",
        name: "Are Dream Tourism tours guided or self-guided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most of our tours include hosted entry and self-guided experiences, while some multi-day tours include guided experiences.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer private tours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer private, customized tours in Italy, France, Switzerland, Germany, Belgium, and the Netherlands.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods do you accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept credit cards, debit cards, and PayPal for secure online booking.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer refunds or cancellations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer flexible cancellation policies. Each tour has specific cancellation terms, so please check the details before booking.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the Colosseum and Roman Forum ticket?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The ticket includes skip-the-line entry to the Colosseum, Roman Forum, and Palatine Hill, with hosted entry assistance.",
        },
      },
      {
        "@type": "Question",
        name: "Do Vatican Museum tickets include access to St. Peter's Basilica?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, our Skip-the-Line Vatican Museum tickets include entry to the Vatican Museums and Sistine Chapel, but not St. Peter's Basilica.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the Vatican Museum and Sistine Chapel tour take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tour lasts around 3 hours, but you can explore at your own pace.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the Florence & Pisa day tour?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tour includes:\n\nFast-track access to Florence's key attractions\nPiazza dei Miracoli & Leaning Tower of Pisa visit\nRound-trip transport from Rome",
        },
      },
      {
        "@type": "Question",
        name: "What should I bring for the Capri Island day trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Comfortable clothing, sunscreen, a hat, and a camera. If you plan to swim, bring swimwear and a towel.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the Venice & Bernina Express Valentine's Tour?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This romantic getaway includes:\n\nVenice walking tour\nGondola ride experience\nScenic train ride on the Bernina Express",
        },
      },
      {
        "@type": "Question",
        name: "What destinations are covered in the Summer Europe Tour?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tour includes Switzerland, Venice, Austria, and Liechtenstein.",
        },
      },
      {
        "@type": "Question",
        name: "What are the must-visit attractions in the Netherlands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some top attractions include:\n\nAmsterdam Canals\nKeukenhof Tulip Gardens (Spring only)\nRijksmuseum & Van Gogh Museum\nKinderdijk Windmills",
        },
      },
      {
        "@type": "Question",
        name: "When is the best time to visit the Netherlands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best time to visit is April–May for tulip season and June–September for good weather.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best way to explore Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best way is by train, with options like the Glacier Express and Bernina Express offering breathtaking views.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best places to visit in Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Top destinations include Zurich, Interlaken, Lucerne, Jungfraujoch (Top of Europe), and Matterhorn.",
        },
      },
      {
        "@type": "Question",
        name: "What are the must-visit attractions in Germany?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Berlin: Brandenburg Gate & Berlin Wall\nBavaria: Neuschwanstein Castle\nCologne: Cologne Cathedral\nRhine Valley: Scenic river cruises",
        },
      },
      {
        "@type": "Question",
        name: "When is the best time to visit Germany?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best time is April–October, with December being ideal for Christmas markets.",
        },
      },
      {
        "@type": "Question",
        name: "What are the top attractions in France?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paris: Eiffel Tower, Louvre Museum, and Notre-Dame\nLoire Valley: Château de Chambord & Château de Chenonceau\nFrench Riviera: Nice, Cannes, and Monaco",
        },
      },
      {
        "@type": "Question",
        name: "When is the best time to visit Paris?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spring (April–June) and Fall (September–November) are ideal for fewer crowds.",
        },
      },
      {
        "@type": "Question",
        name: "What are the must-visit attractions in Belgium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brussels: Grand Place & Atomium\nBruges: Medieval canals & Markt Square\nAntwerp: Diamond District & Cathedral of Our Lady",
        },
      },
      {
        "@type": "Question",
        name: "What is the best way to get around Belgium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best way is by train, with high-speed connections between Brussels, Bruges, and Antwerp.",
        },
      },
      {
        "@type": "Question",
        name: "Can I modify my tour booking after confirmation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, changes are allowed depending on the tour's modification policy. Contact customer support for assistance.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if my tour is canceled due to bad weather?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If a tour is canceled due to extreme weather conditions, you will be offered a rescheduled date or a full refund.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer group discounts for tours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide special discounts for groups of 6 or more.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
});

export default FAQSchema;
