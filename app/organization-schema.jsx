"use client";

import { memo } from "react";

const OrganizationSchema = memo(function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dream Tourism IT",
    url: "https://dreamtourism.it",
    logo: "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/1e42ce40-0487-43fe-077a-39bde5402400/public",
    description:
      "Why wait in long lines? Experience Italy's top sights stress-free with Dream Tourism IT! Fast-track entry, expert guides & fully guided tours in Rome, Florence & beyond.",
    keywords:
      "Rome tours, Italy travel guide, Skip-the-line Colosseum tickets, Vatican City tours, Italy sightseeing, Florence private tours, Amalfi Coast travel, Rome travel packages, Italian guided tours, Best Rome tours, Skip-the-line Vatican, Tour booking Italy, Florence sightseeing tours, Best Italy vacation packages, Private Italy tours, Italy family vacations, Colosseum tour packages, Italian vacation planner, Rome history tours, Italy cultural tours, Guided Florence tours, Skip-the-line Vatican Museum tickets, Rome day trips, Amalfi Coast day tours, Italian adventure tours, Best tours in Rome, Personalized Italy tours, Italy group tours, Italy luxury tours, Rome private tours, Best Vatican tours, Italy honeymoon tours, Skip-the-line tickets Rome, Top Italy tours, Italian art and culture tours, Venice day trips, Cinque Terre tours, Italy food tours, Naples tours, Pisa sightseeing, Italy road trips, Rome walking tours, Colosseum skip-the-line, Vatican tours with guide, Best guided tours Rome, Italy guided group tours, Cultural tours Italy, Travel packages Italy, Rome sightseeing guides, Tuscany tours, Italy sightseeing tickets, Rome city tours, Italy coastal tours, Best Florence tours, Rome cultural tours, Florence private tours, Guided tours Amalfi Coast, Skip-the-line Florence tours, Italy history tours, Rome day trips from airport, Rome city guide, Full-day tours Rome, Italy private travel, Italy excursion tours, Best day tours Italy, Colosseum skip-the-line packages, Italy tour operators, Florence skip-the-line, Italy vacation planning, Italy best travel experiences, Italy historical tours, Rome museum tours, Family tours Italy, Vatican City guided tours, Exclusive Italy tours, Rome booking guide, Small group tours Rome, Skip-the-line tours in Italy, Travel to Italy, Best tours in Italy, Tripadvisor Rome tours, Top Florence tours, Italy famous tours, Rome food tours, Best Rome tour operators, Top vacation tours Italy, Italy heritage tours, Full-day Vatican tours, Rome sightseeing tours, Florence excursions, Amalfi Coast private tours, Skip-the-line Rome, Italy tour company, Guided trips Italy, Book Italy tours, Italy vacation tour packages, Exclusive Rome tours, Rome adventure tours, Rome private tour guides, Florence tour tickets, Cultural tours Florence, Italy walking tours, Roman history tours, Group tours Italy, Skip-the-line entry Vatican, Italy private vacation tours, Florence day trip tours, Italy group travel packages, Rome private guide, Small group tours Italy, Italy luxury group tours, Private Colosseum tours, Florence art tours, Guided tours Rome, Best Italy vacation packages, Rome city travel tours, Top vacation spots Rome, Vatican Museum private tours, Best tours in Florence Italy, Skip-the-line Vatican Museum, Skip-the-line Colosseum tickets Rome, Italian adventure sightseeing tours, Florence private walking tours, Rome private tours with guide, Florence private tours for families, Skip-the-line Vatican tickets booking, Top Italy vacation tours, Best family tours Italy, Exclusive Rome travel experiences, Italy Colosseum ticket booking, Skip-the-line Vatican City tours, Rome historical tours, Top-rated Rome tours, Florence art and history tours, Rome sightseeing vacation packages, Colosseum and Vatican tours, Best day tours from Rome, Italy city tours, Best tours Italy experience, Vatican Museums guided tours, Florence local tours, Full-day tours Italy, Colosseum skip-the-line entry, Rome sightseeing with local guides, Italy cultural vacation tours, Best guided Colosseum tours, Rome and Vatican City tours, Skip-the-line tickets Florence, Exclusive Italy vacation deals, Florence historical sites tours, Best guided Italy tours, Skip-the-line Vatican Museum tours, Rome family sightseeing tours, Private Florence city tours, Best private Italy tours, Exclusive guided Rome tours, Florence historical vacation tours, Skip-the-line Colosseum and Vatican tours, Italy vacation travel packages, Top tours Italy, Skip-the-line tickets for Italy tours, Florence sightseeing travel, Italy tourism tours, Rome exclusive city tours, Skip-the-line Vatican tours booking, Italy destination tours, Full-day Vatican City tours, Travel Italy packages, Florence travel guides, Skip-the-line Vatican City experience, Best sightseeing tours Rome, Top-rated private Italy tours, Skip-the-line tours Rome, Florence guided walking tours, Skip-the-line Vatican and Colosseum tours, Private Italy cultural tours, Top Florence vacation packages, VIP tours Rome, Top-rated tours Florence, Rome group tours, Guided Italy history tours, Rome cultural travel, Vatican Museums tours, Florence historical travel guides, Italy Colosseum tours, Best Vatican private tours, Italy adventure vacation planning, Full-day Rome tours, Exclusive Rome packages, Best Rome travel guides, Skip-the-line Rome Colosseum tickets, Vatican cultural tours, Italy private guided tours, Top Rome cultural tours, Skip-the-line Vatican Rome tickets, Full-day tours in Rome, Italy tour experiences, Florence art cultural tours, Rome adventure and sightseeing tours, Skip-the-line Vatican tickets, Best tours in Italy for families, Italy guided tours, Exclusive tours Rome, Florence art and sightseeing tours, Best Italy Colosseum experiences, Private Vatican guided tours, Full-day Florence tours, Top Italy excursions, Rome art tours, Family Italy vacation tours, Vatican City tours with guide, Exclusive Florence day tours, Italy luxury travel experiences, Skip-the-line entry Colosseum, Rome walking sightseeing tours, Florence family-friendly tours, Rome and Vatican tours, Best Colosseum experiences, Italy historical and art tours, Rome vacation planning guides, Skip-the-line tickets Florence, Full-day Italy tours, Family tours Vatican City, Best Florence vacation packages, Italy tour experiences, Skip-the-line Colosseum tours booking, Best Italy Colosseum tours, Full-day Rome travel guides, Skip-the-line Vatican Museum packages, Best Vatican tours for families, Full-day Italy travel packages, Best Rome guided vacation packages, Top-rated tours in Florence.",
    sameAs: [
      "https://www.pinterest.com/dreamtourismit/",
      "https://www.facebook.com/Dreamtourismrome",
      "https://www.linkedin.com/company/dreamtourismit",
      "https://www.instagram.com/dreamtourismit/",
      "https://www.youtube.com/@dreamtourismit",
      "https://www.google.com/maps/place/Dream+Tourism+S.R.L.S/@41.8933643,12.5063024,17z/data=!3m1!4b1!4m6!3m5!1s0x132f61bfe25bde59:0x29755691b8747d6d!8m2!3d41.8933643!4d12.5088773!16s%2Fg%2F11h74c7v3h?entry=ttu",
      "https://www.tripadvisor.co.uk/Attraction_Review-g187791-d17374998-Reviews-Dream_Tourism-Rome_Lazio.html",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+39 388 774 8015",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Rome",
      addressRegion: "Lazio",
      postalCode: "00100",
      addressCountry: "IT",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
});

export default OrganizationSchema;
