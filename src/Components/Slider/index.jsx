import React from "react";
import style from "./Slider.module.scss";
import Item from "./Item";

const data = [
  {
    title: "Stan Smith",
    description: "Forever",
    img: "./assets/img/slide1.jpg",
    color: "#86bf38"
  },
  {
    title: "Air Jordan ",
    description: "Design you own",
    img: "./assets/img/slide2.jpg",
    color: "#f8c91a"
  },
  {
    title: "Converse X Comme des garcon",
    description: "Перезапуск культовой модели",
    img: "./assets/img/slide3.jpg",
    color: "#000"
  },
];

const Slider = (autoPlay = true, autoPlayTime = 30000) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const length = data.length;
  

  const nextSlide = () => {
    setActiveSlide(activeSlide === length - 1 ? 0 : activeSlide + 1);
  };
  const prevSlide = () => {
    setActiveSlide(activeSlide === 0 ? length - 1 : activeSlide - 1);
  };
  

  return (
    <div className={style.slider}>
      <div className={style.slider__next} onClick={nextSlide}>
        <img src="./assets/img/next.png" alt="next" />
      </div>
      <div className={style.slider__prev} onClick={prevSlide}>
      <img src="./assets/img/next.png" alt="prev" />
      </div>
      <div className={style.slider__lenta}>
        {data.map((item, idx) => (
          <Item
            title={item.title}
            img={item.img}
            description={item.description}
            active={activeSlide === idx ? true : false}
            btncol={item.color}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
