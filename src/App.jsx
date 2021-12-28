import React from "react";
import axios from "axios";
import { Route } from "react-router";

import "./App.scss";

import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import Slider from "./Components/Slider";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Orders";
import Scrollable from "./Components/Scrollable";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [drawerItems, setDrawerItems] = React.useState([]);
  const [openBasket, setOpenBasket] = React.useState(false);
  const [searchItem, setSearchItem] = React.useState("");
  const [favoritesItems, setFavoritesItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      let favoritesResponse = await axios.get(
        "https://6138f108163b56001703a182.mockapi.io/favorites"
      );

      let cartResponse = await axios.get(
        "https://6138f108163b56001703a182.mockapi.io/cart"
      );
      let itemsResponse = await axios.get(
        "https://6138f108163b56001703a182.mockapi.io/items"
      );
      setIsLoading(false);
      setFavoritesItems(favoritesResponse.data);
      setDrawerItems(cartResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onClickBasket = () => {
    setOpenBasket((prev) => !prev);
  };

  const addToBasketItems = async (obj) => {
    try {
      if (drawerItems.find((item) => item.article === obj.article)) {
        axios.delete(
          `'https://6138f108163b56001703a182.mockapi.io/cart/${obj.userId}'`
        );
        setDrawerItems((prev) =>
          prev.filter((item) => item.article !== obj.article)
        );
      } else {
        const { data } = await axios.post(
          "https://6138f108163b56001703a182.mockapi.io/cart",
          obj
        );
        setDrawerItems([...drawerItems, data]);
      }
    } catch (err) {
      alert("Не удалось добавить в корзину");
    }
  };

  const onRemoveDrawerItems = (article) => {
    axios.delete(`https://6138f108163b56001703a182.mockapi.io/cart/${article}`);
    setDrawerItems((prev) =>
      prev.filter((item) => Number(item.article) !== Number(article))
    );
  };

  const onChangeInput = (event) => {
    setSearchItem(event.target.value);
  };

  const addFavorites = async (obj) => {
    try {
      if (favoritesItems.find((item) => item.article === obj.article)) {
        axios.delete(
          `https://6138f108163b56001703a182.mockapi.io/favorites/article/${obj.article}`
        );
        setFavoritesItems((prev) =>
          prev.filter((item) => item.article !== obj.article)
        );
      } else {
        const { data } = await axios.post(
          "https://6138f108163b56001703a182.mockapi.io/favorites",
          obj
        );
        setFavoritesItems([...favoritesItems, data]);
      }
    } catch (err) {
      alert("Не удалось добавить в избранное");
    }
  };

  const cartIsAdded = (item) => {
    return drawerItems.some((obj) => obj.article === item);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        favoritesItems,
        drawerItems,
        cartIsAdded,
        setOpenBasket,
        setDrawerItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          items={drawerItems}
          onClickClose={() => setOpenBasket(false)}
          onRemove={onRemoveDrawerItems}
          opened={openBasket}
        />

        <div className="container">
          <Header clickBasket={onClickBasket} />
          <Slider />
          <Scrollable/>
          <Route path="/" exact>
            <Home
              items={items}
              searchItem={searchItem}
              addToBasketItems={addToBasketItems}
              onChangeInput={onChangeInput}
              addFavorites={addFavorites}
              drawerItems={drawerItems}
              favoritesItems={favoritesItems}
              isLoading={isLoading}
              sort={["умолчанию", "возрастанию", "убыванию"]}
            />
          </Route>

          <Route path="/favorite">
            <Favorites
              addFavorites={addFavorites}
              addToBasketItems={addToBasketItems}
            />
          </Route>

          <Route path="/orders">
            <Orders />
          </Route>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
