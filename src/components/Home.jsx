import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuList from "./MenuList";

const Home = () => {
  const [menuData, setMenuData] = useState([]);
  const [selected, setSelected] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const handleAddToCard = (addedItem) => {
    const addItems = addedItems?.length
      ? addedItems?.map((item) => {
          if (item?.dish_id === addedItem?.dish_id) {
            const itemCount = item?.count ? item?.count + 1 : 1;
            return { ...item, count: itemCount };
          }
          return item;
        })
      : [...addedItems, { ...addedItem, count: 1 }];
    setAddedItems(addItems);
    setCartCount((prevState) => prevState + 1);
  };
  const handleRemoveFromCard = (removedItem) => {
    if (!addedItems?.length) {
      return;
    }
    let flag = false;
    const removedItems = addedItems?.map((item) => {
      if (item?.dish_id === removedItem?.dish_id) {
        flag = true;
        const itemCount = item?.count === 0 ? 0 : item?.count - 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
    if (flag) {
      setCartCount((prevState) => (prevState === 0 ? 0 : prevState - 1));
      setAddedItems(removedItems);
    }
  };
  const handleGetData = async () => {
    try {
      const { data } = await axios.get(
        "https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb"
      );
      setMenuData(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm text-gray-500">{menuData?.branch_name}</h1>
        <div className="">My Cart {cartCount}</div>
      </div>

      <div className="min-w-[400px] flex justify-start items-center gap-4 mt-10 w-full border-b-2 border-gray-600 overflow-x-scroll">
        {menuData?.table_menu_list?.length
          ? menuData?.table_menu_list?.map((list) => (
              <div
                key={list?.menu_category_id}
                onClick={() => setSelected(list?.menu_category_id)}
              >
                <h1
                  className={`cursor-pointer text-gray-500 py-2 ${
                    selected === list?.menu_category_id
                      ? "text-red-500 border-b-2"
                      : ""
                  }`}
                >
                  {list?.menu_category}
                </h1>
              </div>
            ))
          : null}
      </div>
      {menuData?.table_menu_list?.length ? (
        menuData?.table_menu_list?.map((list) => (
          <div key={list?.menu_category_id}>
            {selected === list?.menu_category_id ? (
              <MenuList
                menuList={list}
                isActive={selected === list?.menu_category_id}
                onAdd={handleAddToCard}
                onRemove={handleRemoveFromCard}
                addedItems={addedItems}
              />
            ) : null}
          </div>
        ))
      ) : (
        <>No data!</>
      )}
    </div>
  );
};

export default Home;
