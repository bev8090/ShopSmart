const OrderItemCard = ({ orderItem }) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-200 border border-gray-500 p-3 max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="card-body text-black items-center justify-center">
        <h3 className="card-title">{orderItem.name}</h3>
        <img src={orderItem.image} alt="Product Image" className="size-25 h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out" />
        <h4 className="font-mono text-xl">Quantity: {orderItem.quantity}</h4>
        <h4 className="font-mono font-bold text-xl">${(orderItem.price * orderItem.quantity).toFixed(2)}</h4>
        <h5 className="font-mono italic text-lg">Product Id: {orderItem.productId}</h5>
      </div>
    </div>
  )
}

export default OrderItemCard;