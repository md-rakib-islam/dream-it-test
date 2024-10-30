const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Customer Care",
      action: "tel:+(39) 38 877 48015",
      text: "+39 38 877 48015",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:sales@dreamtourism.it",
      text: "sales@dreamtourism.it",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mb-20" key={item.id}>
          <div className={"text-14"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-dark-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
