const useMenus = (menus) => {
  const filteredMenus = menus
    ?.filter((item) => {
      // Filter out "About Us" and "Blogs" from the top-level items
      if (item.name === "About Us") {
        return false;
      }

      // For "Destinations", filter out "United States" from its children
      if (item.name === "Destinations") {
        const filteredChildren = item.children.filter(
          (child) => child.name !== "United States"
        );
        return { ...item, children: filteredChildren };
      }

      return true;
    })
    .map((item) => {
      // Create new objects for all top-level items to avoid mutations
      if (item.name === "Destinations") {
        return {
          ...item,
          children: item.children.filter(
            (child) => child.name !== "United States"
          ),
        };
      }
      return { ...item };
    });

  filteredMenus?.sort((a, b) => a.position - b.position);

  const modifiedMenuItems = filteredMenus?.map((item) => {
    if (item.name === "Home") {
      return {
        ...item,
        routePath: "/",
        children:
          item?.children?.length > 0
            ? item.children.map((subItem) => ({
                ...subItem,
                routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
              }))
            : [],
      };
    }
    if (item.name === "About Us") {
      return {
        ...item,
        routePath: "/about",
        children:
          item?.children?.length > 0
            ? item.children.map((subItem) => ({
                ...subItem,
                routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
              }))
            : [],
      };
    }
    if (item.name == "Things to do") {
      return {
        ...item,
        routePath: "/things-to-do",
        children:
          item?.children?.length > 0
            ? item.children.map((subItem) => ({
                ...subItem,
                routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
              }))
            : [],
      };
    }
    if (item.name === "Tours") {
      return {
        ...item,
        routePath: "/tours?location=&category&min=&max",
        children:
          item?.children?.length > 0
            ? item.children.map((subItem) => ({
                ...subItem,
                routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
              }))
            : [],
      };
    }
    return {
      ...item,
      routePath: `${
        item?.name?.toLowerCase() == "destinations"
          ? `/destinations/${item.children[0]?.name
              ?.toLowerCase()
              ?.split(" ")
              ?.join("_")}`
          : item?.name?.toLowerCase()
      }`,
      children:
        item?.children?.length > 0
          ? item.children.map((subItem) => ({
              ...subItem,
              routePath: `/${item.name.toLowerCase()}/${subItem.name
                .toLowerCase()
                ?.split(" ")
                ?.join("_")}`,
            }))
          : [],
    };
  });
  return modifiedMenuItems;
};

export default useMenus;
