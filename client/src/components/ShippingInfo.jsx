const ShippingInfo = ({ shipping }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Full name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={shipping.name}
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={shipping.address}
            readOnly
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={shipping.city}
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={shipping.postalCode}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo;