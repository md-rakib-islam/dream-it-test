const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Customer Care",
      action: "tel:+3906 4525 9865",
      text: "+3906 4525 9865",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:info@dreamtourism.it",
      text: "info@dreamtourism.it",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-0" key={item.id}>
          <div className={"text-14 mt-0"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
