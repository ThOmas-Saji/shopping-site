import React from "react";

const MenuItems = ({ item, onRemove, onAdd, count }) => {
  return (
    <div className="flex justify-between w-full h-[200px] border-b-2 p-2">
      <div className="flex flex-col gap-2 text-sm">
        <h2>{item?.dish_name}</h2>
        <h2>{item?.dish_price}</h2>
        <h2>{item?.dish_description}</h2>
        <div className="flex p-2 rounded-full justify-center items-center gap-4 bg-green-600 text-white w-[150px] h-fit">
          <button onClick={() => onRemove(item)}>-</button>
          <span>{!!count ? count?.count : 0}</span>
          <button onClick={() => onAdd(item)}>+</button>
        </div>
      </div>
      <p>{item?.dish_calories} calories</p>
      <img
        className="w-[100px] h-[100px] object-contain"
        src={item?.dish_image}
        alt="dish"
      />
    </div>
  );
};

export default MenuItems;
