import getAllMenuItem from "@/services/menuService";

const MenuList = async () => {
  const menuItems = await getAllMenuItem();

  return <div>MenuList</div>;
};

export default MenuList;
