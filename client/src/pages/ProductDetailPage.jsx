import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductsNotFound from "../components/ProductsNotFound";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log("Error in retrieving product", error);
        toast.error("Failed to load page.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      toast.error("Please login first before proceding");
      return;
    }

    try {
      const storedCartData = localStorage.getItem("cart");

      if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        cartData.push({
          productId: id,
          name: product.name,
          image: product.image,
          quantity: quantity,
          price: product.price,
          stock: product.countInStock
        });

        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        const cartStorage = [];
        cartStorage.push({
          productId: id,
          name: product.name,
          image: product.image,
          quantity: quantity,
          price: product.price,
          stock: product.countInStock
        });

        localStorage.setItem("cart", JSON.stringify(cartStorage));
      }

      toast.success("Product added to cart");
    } catch (error) {
      console.log("Error in saving item(s) to local storage.", error);
      toast.error("Failed to add product to cart.");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {loading && (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      )}

      {!product && <ProductsNotFound />}
      {product && (
        <div className="pt-24 container flex flex-col items-center text-black">
          <img src={product.image} alt="Product Image" className="size-40" />
          <h2 className="text-xl font-serif font-bold">{product.name}</h2>
          <div className="border border-gray-400 w-full h-0.5 bg-gray-400" />
          <h3 className="text-lg font-mono font-bold italic">${product.price}</h3>

          {/* Out of Stock */}
          {product.countInStock < 1 && (
            <div>
              <h4 className="font-sans text-red-600 text-lg">Out of Stock</h4>
              <form onSubmit={handleSubmit} className="flex flex-col font-sans p-1 my-2.5">
                <div className="border-gray-500 border flex p-1">
                  <label for="quantity" className="mr-2.5">Quantity: </label>
                  <input type="number" id="quantity" min="0" max={product.countInStock} defaultValue={0} disabled />
                </div>
                <button className="btn mt-3 hover:opacity-90 hover:shadow disabled:bg-gray-400 disabled:text-black disabled:opacity-80 disabled:hover:cursor-not-allowed" disabled>Add to Cart</button>
              </form>
              <div className="border border-gray-400 w-full h-0.5 bg-gray-400" />
              <h2 className="text-xl font-serif font-bold mt-3">Product Details</h2>
              <h3 className="text-lg font-serif font-bold">Category: {product.category}</h3>
              <h4 className="font-serif font-bold mt-4">Product Description</h4>
              <p>{product.description}</p>
            </div>
          )}

          {/* In Stock */}
          {product.countInStock > 0 && (
            <div>
              <h4 className="font-sans text-green-600 text-lg">In Stock</h4>
              <form onSubmit={handleSubmit} className="flex flex-col font-sans p-1 my-2.5">
                <div className="border-gray-500 border flex p-1">
                  <label for="quantity" className="mr-2.5 label">Quantity: </label>
                  <input type="number" id="quantity" min="1" max={product.countInStock} defaultValue={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <button className="btn mt-3 hover:opacity-90 hover:shadow">Add to Cart</button>
              </form>
              <div className="border border-gray-400 w-full h-0.5 bg-gray-400" />
              <h2 className="text-xl font-serif font-bold mt-3">Product Details</h2>
              <h3 className="text-lg font-serif font-bold">Category: {product.category}</h3>
              <h4 className="font-serif font-bold mt-4">Product Description</h4>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default ProductDetailPage;