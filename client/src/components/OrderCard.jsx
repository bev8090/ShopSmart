import { Link } from "react-router";

const OrderCard = ({ order }) => {
  const date = new Date(order.paidAt);
  return (
    <Link to={`/profile/order/${order._id}`} className="card bg-white shadow-md rounded-lg p-6 border border-black hover:shadow-lg hover:bg-gray-100 ransition-all duration-200">
      <div className="card-body text-black items-center justify-center">
        <h3 className="card-title">{date.toLocaleDateString()}</h3>
        <h4 className="font-mono italic text-xl">Total: ${order.totalAmount}</h4>
      </div>
    </Link>
  )
}

export default OrderCard;