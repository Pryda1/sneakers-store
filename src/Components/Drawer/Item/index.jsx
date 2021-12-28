import style from "./Item.module.scss";

function Item({ price, title, imgUrl, article, onClickRemove, indx }) {
    console.log({ title, imgUrl })
    return (
        <div className={style.item}>
            <img
                className={style.item__pic}
                src={imgUrl}
                alt={title}
            />
            <div className={style.item__text}>
                <p>{title}</p>
                <div className={style.text__price}>

                    <b>{price}</b>
                </div>
            </div>

            <button className={style.item__button}>
                <img width={25} heigth={25} src="./assets/img/btn-remove.svg" alt="addCart" onClick={obj => onClickRemove(article)} />
            </button>
        </div>
    );
}
export default Item;