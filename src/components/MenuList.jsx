import React from "react";
import MenuItems from "./MenuItems";

const MenuList = ({ menuList, isActive, onAdd, onRemove, addedItems }) => {
  return (
    <div className="flex flex-col">
      {menuList?.category_dishes?.map((item) => {
        const count = addedItems?.find((data)=>data?.dish_id === item?.dish_id);
        return (
          <MenuItems
            key={item?.dish_id}
            item={item}
            onAdd={onAdd}
            onRemove={onRemove}
            count={count}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
