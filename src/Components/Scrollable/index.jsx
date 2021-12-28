import React from "react";
import style from "./Scrollable.module.scss";

const dataScroll = [
  { title: "New Balance промокод на скидку: -20%", link: "./assets/img/NB.png" },
  { title: "Converse промокод на скидку: -20%", link: "./assets/img/converse.png" },
  { title: "Nike промокод на скидку: -20%", link: "./assets/img/nike.png" },
  { title: "Adidas промокод на скидку: -20%", link: "./assets/img/adidas.png" },
  { title: "Puma промокод на скидку: -20%", link: "./assets/img/puma.png" },
  { title: "Maison Margela промокод на скидку: -20%", link: "./assets/img/Maison.png" },
  { title: "Diadora промокод на скидку: -20%", link: "./assets/img/diadora.png" },
  { title: "Asics промокод на скидку: -20%", link: "./assets/img/asics.png" },
];

function Scrollable() {
  let scrollRef = React.useRef();
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWeel = (e) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 4,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWeel);
      return () => el.removeEventListener("wheel", onWeel);
    }
  }, []);
  return (
    <div ref={scrollRef} className={style.scroll__container}>
      <div className={style.scroll__items}>
        {dataScroll.map((item) => (
          <div className={style.scroll__item}>
            <div className={style.scroll__img}>
              <img src={item.link} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scrollable;
