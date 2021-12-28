import React from "react";
import style from "./Cards.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

function Cards({
  article,
  link,
  link2,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const [isFav, setIsFav] = React.useState(favorited);
  const { cartIsAdded } = React.useContext(AppContext);

  const onAddtoDrawer = () => {
    onPlus({ imgUrl: link, title, price, article, imgUrl2: link2 });
  };

  const addFavorite = () => {
    onFavorite({ imgUrl: link, title, price, article, imgUrl2: link2  });
    setIsFav((prev) => !prev);
  };

  return (
    <div className={style.carts__item}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={190}
          height={240}
          viewBox="0 0 150 240"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="15" rx="10" ry="10" width="180" height="100" />
          <rect x="0" y="160" rx="0" ry="0" width="70" height="20" />
          <rect x="110" y="185" rx="5" ry="5" width="40" height="40" />
          <rect x="0" y="135" rx="0" ry="0" width="180" height="20" />
          <rect x="0" y="205" rx="0" ry="0" width="70" height="20" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && <img
            className={style.item_fav}
            width={20}
            height={20}
            src={
              isFav ? "./assets/img/fav-check.svg" : "./assets/img/heart.svg"
            }
            alt="favorite"
            onClick={addFavorite}
          />}
          <div className={style.item__img}>
            <div className={style.item__switch}>
              <div className={style.switch__item}>
                <img className={style.switch__pic} src={link} alt={title} />
              </div>
              {link2 && <div className={style.switch__item}>
                <img className={style.switch__pic} src={link2} alt={title} />
              </div>}
              
            </div>
          </div>

          <p className={style.item_text}>{title}</p>
          <div className={style.item_footer}>
            <ul className={style.item_price}>
              <li>
                <p>Цена:</p>
              </li>
              <li>
                <b>{price} руб.</b>
              </li>
            </ul>
            <button
              className={style.item_button}
              onClick={(obj) => onAddtoDrawer({ obj })}
            >
              {onPlus && <img
                width={20}
                heigth={20}
                src={
                  cartIsAdded(article)
                    ? "./assets/img/btn-checked.svg"
                    : "./assets/img/plus.svg"
                }
                alt="addCart"
              />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cards;
