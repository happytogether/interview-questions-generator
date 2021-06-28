import React, { createContext, useState } from "react";

export const CategoryContext = createContext({
  categoryType: "",
  categoryChangeHandler: () => {},
});

const CategoryContextProvider = (props) => {
  const [categoryType, setCategoryType] = useState("");

  const categoryChangeHandler = (categoryType) => {
    setCategoryType(cursorType);
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryType: categoryType,
        categoryChangeHandler: categoryChangeHandler,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
