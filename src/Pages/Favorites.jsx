import React from "react";
import Cards from "../Components/Cards";
import { AppContext } from "../App";

function Favorites({ addFavorites, addToBasketItems }) {
  const {favoritesItems} = React.useContext(AppContext);
  return (
    <section className="main">
      <div className="main__title">
        <h2>Избранные товары</h2>
      </div>
      <div className="main__carts">
        {favoritesItems && <div className="empty__fav"></div>}
        {favoritesItems.map((item) => (
          <Cards
            title={item.title}
            price={item.price}
            link={item.imgUrl}
            link2={item.imgUrl2}
            onFavorite={(obj) => addFavorites(obj)}
            onPlus={(obj) => addToBasketItems(obj)}
            favorited={true}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}

export default Favorites;
