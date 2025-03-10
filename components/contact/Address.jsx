const Address = ({ uk }) => {
  // const addressContent = [
  //   {
  //     id: 1,
  //     colClass: "col-lg-3",
  //     title: "Uk Address:",
  //     content: <>Unit-6, 736-740 Romford Road, London, E12 6BT.</>,
  //   },
  //   {
  //     id: 2,
  //     colClass: "col-auto",
  //     title: "Customer Care",
  //     content: (
  //       <>
  //         <a href="tel:+442071012544">+442071012544</a>
  //       </>
  //     ),
  //   },
  //   {
  //     id: 3,
  //     colClass: "col-auto",
  //     title: "Need live support?",
  //     content: (
  //       <>
  //         {" "}
  //         <a href="mailto:info@dreamtourism.it">info@dreamtourism.co.uk</a>
  //       </>
  //     ),
  //   },
  // ];

  const addressContent2 = [
    {
      id: 1,
      colClass: "col-lg-3",
      title: "Italy Address",
      content: <>Via Principe Eugenio, 95, 00185 Roma RM, Italy.</>,
    },
    {
      id: 2,
      colClass: "col-auto",
      title: "Customer Care",
      content: (
        <>
          <a href="tel:+39 388 774 8015" rel="nofollow">
            +39 388 774 8015
          </a>
        </>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Need live support?",
      content: (
        <>
          {" "}
          <a href="ashiq@dreamtourism.it" rel="nofollow">
            ashiq@dreamtourism.it
          </a>
        </>
      ),
    },
  ];

  const newAddressContent = addressContent2[0];

  return (
    <>
      {/* {addressContent2.map((item) => ( */}
      <div className={`${newAddressContent.colClass}`}>
        <div className="text-14 text-light-1">{newAddressContent.title}</div>
        <div className="text-18 fw-500 mt-10">{newAddressContent.content}</div>
      </div>
      {/* ))} */}
    </>
  );
};

export default Address;
