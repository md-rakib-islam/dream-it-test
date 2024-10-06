module.exports = [
  {
    id: 2,
    title: "Navigation",
    menuList: [
      { name: "About Us", routerPath: "/about" },
      { name: "Contact", routerPath: "/contact" },
      { name: "Blogs", routerPath: "/blogs" },
      // { name: "Legal Notice", routerPath: "/" },
      { name: "Privacy Policy", routerPath: "/terms?type=privacy_policy" },
      {
        name: "Terms and Conditions",
        routerPath: "/terms?type=general_terms_of_use",
      },
    ],
  },
];
