import React, { useState, useContext, useEffect } from "react";

import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  console.log(cocktails);
  const fetchCocktails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${search}`);
      const data = await response.json();

      const { drinks } = data;
      if (!drinks) {
        setCocktails([]);
      } else {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, [search]);

  return (
    <AppContext.Provider value={{ loading, search, cocktails, setSearch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
