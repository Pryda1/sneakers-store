import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import {useCart} from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>
      <Link to='/'>
      <div className={styles.header__logo}>
        <img height={50} width={50} src="./assets/img/logo.png" alt="logo" />
        <div className={styles.logo__text}>
          <h3>Sneakers store</h3>
          <p>интернет магазин кроссовок</p>
        </div>
      </div>
      </Link>
      
      <ul className={styles.header__user}>
        <li className="user_card" onClick={props.clickBasket}>
          <img width={18} height={18} src="./assets/img/cart.svg" alt="card" />
          <span>{totalPrice}</span> руб.
        </li>
        <Link to='/favorite'>
        <li className={styles.user__favorite}>
          <img
            width={18}
            height={18}
            src="./assets/img/heart.svg"
            alt="favorite"
          />
        </li>
        </Link>
        <Link to='/orders'> 
        <li className={styles.user__account}>
          <img
            width={18}
            height={18}
            src="./assets/img/user.svg"
            alt="acount"
          />
        </li>
        </Link>
        
      </ul>
    </header>
  );
}

export default Header;
