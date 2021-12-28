import Cards from "../Components/Cards";
import Grid from "../Components/Grid";
import React from "react";

function Home({
  items,
  searchItem,
  onChangeInput,
  addFavorites,
  addToBasketItems,
  favoritesItems,
  isLoading,
  sort,
}) {
  const [popupActive, setPopupActive] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState(0);

  const isSorting = (indx) => {
    setActiveSort(indx);
    setPopupActive(!popupActive);
  };

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)]
        : items.filter((items) =>
            items.title.toLowerCase().includes(searchItem.toLowerCase())
          )
    ).map((item, index) => (
      <Cards
        key={index}
        onFavorite={(obj) => addFavorites(obj)}
        onPlus={(obj) => addToBasketItems(obj)}
        favorited={favoritesItems.some(
          (obj) => Number(obj.article) === Number(item.article)
        )}
        loading={isLoading}
        {...item}
      />
    ));
  };


  return (
    <section className="main">
      <div className="main__title">
        <h2>{searchItem ? `Поиск по:${searchItem}` : "Все кроссовки"}</h2>
        <div className="title__sort">
          сортировка по:
          <span onClick={() => setPopupActive(!popupActive)}>{sort[activeSort]}</span>
          {popupActive && (
            <div className="sort__popup">
              <ul>
                {sort.map((item, indx) => (
                  <li
                    onClick={() => isSorting(indx)}
                    className={activeSort === indx ? "active" : ""}
                  >
                    {sort[indx]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="title__search">
          <img
            className="search__icon"
            src="./assets/img/search.svg"
            alt="search"
          />
          <input
            type="text"
            value={searchItem}
            placeholder="поищем..."
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="main__carts">{renderItems()}</div>
      <Grid />
    </section>
  );
}

export default Home;
