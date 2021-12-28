import React from 'react';
import style from "./Slider.module.scss";


const Item = ({title, description, img, active,btncol}) => {
    return (
        <div className={active ? style.slider__active : style.slider__slide}>
          <div className={style.slider__info}>
            <h2>
              <span style={{color:`${btncol}`}}>{title}</span> <br /> {description}
            </h2>
            <button style={{backgroundColor:`${btncol}`}}>Купить</button>
          </div>
          <img src={img} alt="слайд" />
        </div>
    )
}

export default Item;
