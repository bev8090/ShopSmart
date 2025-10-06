import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoaderIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductsNotFound from "../components/ProductsNotFound";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import axios from "axios";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://shopsmart-server-44g8.onrender.com/api/products/${category}`);
        setProducts(res.data);
      } catch (error) {
        console.log("Error in fetching products", error);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {products.length === 0 && <ProductsNotFound />}
      {products.length > 0 && (
        <div className="pt-24 container flex flex-col items-center text-black">
          <h1 className="font-bold text-2xl mb-5">{category.toUpperCase()}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map(product => (<ProductCard product={product} />))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryPage;
