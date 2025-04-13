const Social = () => {
  const socialContent = [
    {
      id: 1,
      icon: "icon-facebook",
      link: "https://www.facebook.com/dreamtourismit/",
    },
    { id: 2, icon: "icon-twitter", link: "https://x.com/dreamtourismit" },
    {
      id: 3,
      icon: "icon-instagram",
      link: "https://instagram.com/dreamtourismit/",
    },
    {
      id: 4,
      icon: "icon-linkedin",
      link: "https://www.linkedin.com/company/dreamtourismit/",
    },

    {
      id: 5,
      icon: "icon-pinterest",
      link: "https://www.pinterest.com/dreamtourismit/",
    },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`${item.icon} text-18`} />
        </a>
      ))}
    </>
  );
};

export default Social;
