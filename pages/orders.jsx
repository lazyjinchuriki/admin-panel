import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orderspage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  console.log(orders);
  return (
    <Layout>
      <h1>Orders</h1>
      <div className="overflow-scroll">
        <table className=" w-full shadow-lg">
          <thead>
            <tr>
              <th className="border border-blue-600 p-3">Date</th>
              <th className="border border-blue-600 p-3">Recipient</th>
              <th className="border border-blue-600 p-3">Products</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-blue-600 p-4 text-center">
                    <b>{new Date(order.createdAt).toDateString()}</b>
                  </td>
                  <td className="border border-blue-600 p-4">
                    <b>
                      {order.name} <br />
                      {order.email}
                      <br />
                      {order.address}, {order.city} ({order.country})<br />
                      {order.postalCode}
                    </b>
                  </td>
                  <td className="border border-blue-600 p-4 max-w-sm">
                    {order.line_items.map((item) => (
                      <div key={item.id}>
                        <b>{item.price_data.product_data.name}</b> x (
                        {" " + item.quantity + " "})
                        <br />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
