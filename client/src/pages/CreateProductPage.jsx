import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { ArrowLeftIcon } from "lucide-react";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const categories = ["clothing", "toys", "pets", "electronics", "kitchen", "grocery", "sports", "furniture", "books", "office", "seasonal"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      toast.error("Price must be a valid number");
      return;
    }

    const lowerCategory = category.toLowerCase();
    if (!categories.some(ctg => ctg === lowerCategory)) {
      toast.error("No such category exists. Please input another category.");
      return;
    }

    if (countInStock < 1) {
      toast.error("There must be at least 1 product in stock");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://shopsmart-server-44g8.onrender.com/api/products", { name, price: parsedPrice, image, description, category: lowerCategory, countInStock });
      toast.success("Product created successfully!");
      navigate("/admin");
    } catch (error) {
      console.log("Error in creating product", error.message);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          <Link to={"/admin"} className="btn btn-primary mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Admin Panel
          </Link>

          <div className="card bg-gray-100 text-black border-gray-500 border">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input border border-gray-500 bg-gray-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Product Price</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Price"
                    className="input border border-gray-500 bg-gray-100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Product Image</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Image URL"
                    className="input border border-gray-500 bg-gray-100"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Product Description</span>
                  </label>
                  <textarea
                    placeholder="Product Description"
                    className="textarea border border-gray-500 bg-gray-100"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Product Category</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Category"
                    className="input border border-gray-500 bg-gray-100"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mr-3">
                    <span className="label-text">Count in Stock</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Count in Stock"
                    className="input border border-gray-500 bg-gray-100"
                    min={1}
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProductPage;
