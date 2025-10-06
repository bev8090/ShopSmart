import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="card hover:shadow-lg transition-all duration-200 border border-gray-500 max-w-sm bg-white rounded-2xl shadow-md overflow-hidden mx-2">
      <div className="card-body text-black items-center justify-center">
        <img src={product.image} alt="Product Image" className="w-full size-50 object-contain" />
        <div className="border border-gray-400 w-full h-0.5 bg-gray-400 my-5" />
        <h3 className="card-title">{product.name}</h3>
        <h4 className="font-mono italic text-xl">${product.price}</h4>
      </div>
    </Link>
  )
}

export default ProductCard;