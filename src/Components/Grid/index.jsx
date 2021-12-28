import React from 'react';
import style from './Grid.module.scss';

const gridItems = [
    {img: "./assets/img/grid1.jpg"},
    {img: "./assets/img/grid2.webp"},
    {img: "./assets/img/forum.jpg"},
    {img: "./assets/img/grid3.webp"},
    {img: "./assets/img/grid4.webp"},
    {img: "./assets/img/grid5.jpg"},
    {img: "./assets/img/grid6.webp"},
    {img: "./assets/img/grid7.jpg"},
    {img: "./assets/img/grid9.jpeg"}
]

function Grid() {
    return (
        <div className={style.container}>
            <div className={style.grid__items}>
                {gridItems.map((item, idx)=> <div key={idx} className={style.grid__item}>
                    <img src={item.img} alt="" />
                </div>)}
            </div>
            
        </div>
    )
}

export default Grid;
