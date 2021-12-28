import React from "react";
import style from "./Drawer.module.scss";
import Item from "./Item";
import Info from "./Info";
import axios from "axios";
import { AppContext } from "../../App";
import {useCart} from "../hooks/useCart";

function Drawer({ onClickClose, items = [], onRemove, opened }) {
  const { setDrawerItems } = React.useContext(AppContext);
  const [isComplited, setIsComplited] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const {totalPrice} = useCart();
 
  const onClickOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://6138f108163b56001703a182.mockapi.io/orders",
        { order: items }
      );

      setOrderId(data.id);
      setIsComplited(true);
      setDrawerItems([]);

      for (let i = 0; i < items.length; i++) {
        
       await axios.delete(
          `https://6138f108163b56001703a182.mockapi.io/cart/${i}`
        );
      }
    } catch(error){
      
    }
    setLoading(false);
  };
  return (
    <div className={`${style.overlay} ${opened ? style.open : ""}`}>
      <div className={`${style.drawer} ${opened ? style.open : ""}`}>
        <div className={style.drawer__title}>
          <h2>Корзина</h2>
          <img
            width={25}
            heigth={25}
            src="./assets/img/btn-remove.svg"
            alt="addCart"
            onClick={onClickClose}
          />
        </div>
        {items.length > 0 ? (
          <div className={style.drawer__products}>
            <div className={style.drawer__items}>
              {items.map((obj, indx) => (
                <Item
                  key={obj.title}
                  title={obj.title}
                  price={obj.price}
                  imgUrl={obj.imgUrl}
                  article={obj.article}
                  onClickRemove={onRemove}
                />
              ))}
            </div>
            <div className={style.item__total}>
              <div>
                <p>Итого:</p>
                <span></span>
                <b>{totalPrice} руб.</b>
              </div>
              <div>
                <p>Налог 5%:</p>
                <span></span>
                <b>{Math.floor(totalPrice - (totalPrice*0.95))} руб.</b>
              </div>
            </div>
            <button
              className={style.drawer__button}
              onClick={onClickOrder}
              disabled={loading}
            >
              Оформить заказ
              <img src="./assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        ) : (
          <Info
            img={
              isComplited
                ? "./assets/img/complete-order.jpg"
                : "./assets/img/empty-cart.jpg"
            }
            text={isComplited ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isComplited
                ? `Ваш заказ №${orderId} оформлен и будет передан в службу доставки`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
