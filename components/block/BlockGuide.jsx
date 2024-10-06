import Image from "next/image";

const BlockGuide = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/3/1.svg",
      title: "Best Price Guarantee",
      text: `Unbeatable Value for Your Unforgettable Experience.`,
      delayAnimation: "100",
    },
    {
      id: 2,
      icon: "/img/featureIcons/3/2.svg",
      title: "Easy & Quick Booking",
      text: `Simplified Reservations for Instant Travel Plans.`,
      delayAnimation: "200",
    },
    {
      id: 3,
      icon: "/img/featureIcons/3/3.svg",
      title: "Customer Care 24/7",
      text: `Around-the-Clock Support for Your Peace of Mind.`,
      delayAnimation: "300",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-lg-3 col-sm-6"
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 ">
            <div className="d-flex justify-center">
              <Image
                width={70}
                height={70}
                priority
                src={item.icon}
                alt={item?.title}
                className="js-lazy"
              />{" "}
            </div>
            <div className="text-center mt-30">
              <h4 className="text-18 fw-500">{item.title}</h4>
              <p className="text-15 mt-10">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockGuide;
