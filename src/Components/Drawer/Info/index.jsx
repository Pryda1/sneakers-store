import React from 'react';
import { AppContext } from "../../../App";
import style from "../Drawer.module.scss";

function Info({text, description, img}) {
    const {setOpenBasket} = React.useContext(AppContext);
    
    return (
        <div className={style.drawer_empty}>
            <img src={img} alt="empty" />
            <h3>{text}</h3>
            <p>{description}</p>
            <button className={style.empty_button} onClick={() => setOpenBasket(false)}>
              Вернуться назад
              <img src="./assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
    )
}
export default Info;