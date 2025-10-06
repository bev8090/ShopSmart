import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "react-hot-toast";
import Navbar from "../components/Navbar";
import OrderItemCard from "../components/OrderItemCard";
import ShippingInfo from "../components/ShippingInfo";
import OrdersNotFound from "../components/OrdersNotFound";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://shopsmart-server-44g8.onrender.com/api/orders/order/${id}`, { withCredentials: true });
        setOrder(res.data);
      } catch (error) {
        console.log("Error in retrieving order", error);
        toast.error("Failed to load order page.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {loading && (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      )}

      {!order && <OrdersNotFound />}
      {order && (
        <div className="pt-24 container flex flex-col items-center text-black">
          <h1 className="text-2xl font-bold font-mono">Order Information</h1>
          <h2 className="text-xl font-serif font-bold">Order Id: {order._id}</h2>
          <h3>User Id: {order.user}</h3>
          <div className="container flex items-center justify-around text-black overflow-x-auto">
            {order.orderItems.map(orderItem => (<OrderItemCard orderItem={orderItem} />))}
          </div>
          <div className="border border-gray-400 w-full h-0.5 bg-gray-400" />

          <h3 className="text-lg font-mono font-bold italic">Total: ${order.totalAmount}</h3>
          <h3 className="text-lg font-mono italic">Payment Id: {order.paymentId}</h3>
          <h3 className="text-lg font-mono italic">Date Purchased: {order.paidAt}</h3>

          <div className="border border-gray-400 w-full h-0.5 bg-gray-400" />
          <ShippingInfo shipping={order.shipping} />
        </div>
      )}

    </div>
  )
}

export default OrderDetailPage;
