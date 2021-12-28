import React from "react";
import axios from "axios";
import Cards from "../Components/Cards";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://6138f108163b56001703a182.mockapi.io/orders"
      );
      setOrders(data.map((obj) => obj.order).flat());
    }
    fetchData();
  }, []);
  
  return (
    <section className="main">
      <div className="main__title">
        <h2>Мои заказы</h2>
      </div>
      {orders.map((item, idx) => (
        <div className="order">
          <h2>Заказ №{++idx}</h2>
          <Cards {...item} link={item.imgUrl} link2={item.imgUrl2}/>
        </div>
      ))}
    </section>
  );
}

export default Orders;
