import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import OrdersNotFound from './OrdersNotFound';
import OrderCard from './OrderCard';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`https://shopsmart-server-44g8.onrender.com/api/orders/${user.userId}`, { withCredentials: true });
        setOrders(res.data);
      } catch (error) {
        console.log("Failed to retrieve orders for user: ", error.message);
        //toast.error("Failed to get order history");
      }
    }

    getOrders();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
      {orders.length === 0 && <OrdersNotFound />}
      {orders.length > 0 && (
        <div className="container flex items-center text-black overflow-x-auto space-x-5">
          {orders.map(order => (<OrderCard order={order} />))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory;
