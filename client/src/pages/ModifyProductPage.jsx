import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ArrowLeftIcon, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ModifyProductPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const categories = ["clothing", "toys", "pets", "electronics", "kitchen", "grocery", "sports", "furniture", "books", "office", "seasonal"];

  const handleEditClick = () => {
    setShowDelete(false);
    setShowEdit(true);
  }

  const handleDeleteClick = () => {
    setShowEdit(false);
    setShowDelete(true);
  }

  const handleEditSubmit = async (e) => {
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

    try {
      setLoading(true);

      await axios.put(`https://shopsmart-server-44g8.onrender.com/api/products/${id}`, { name, price: parsedPrice, image, description, category: lowerCategory, countInStock });
      toast.success("Product updated successfully!");
      navigate("/admin");
    } catch (error) {
      if (error.response.status === 404) {
        console.log("Product not found", error);
        toast.error("Product not found. Please input a valid Product Id");
      } else {
        console.log("Error in updating product", error);
        toast.error("Failed to update product information");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteSubmit = async (e) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    e.preventDefault();

    try {
      await axios.delete(`https://shopsmart-server-44g8.onrender.com/api/products/${id}`);
      toast.success("Product successfully deleted!");
      navigate("/admin");
    } catch (error) {
      if (error.response.status === 404) {
        console.log("Product not found", error);
        toast.error("Product not found. Please input a valid Product Id");
      } else {
        console.log("Error in deleting product", error);
        toast.error("Failed to delete product");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='container pt-20 text-black'>
        <Link to={"/admin"} className="btn btn-primary mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Admin Panel
        </Link>
        <div className='flex flex-col items-center space-y-2'>
          <h1 className='text-2xl font-bold'>Modify Products</h1>
          <h2 className='text-lg'>Would you like to edit or delete an existing product?</h2>
          <div className='flex space-x-2'>
            <button className='flex btn btn-warning' onClick={handleEditClick}>
              Edit
              <Edit className='size-5' />
            </button>
            <button className='flex btn btn-error' onClick={handleDeleteClick}>
              Delete
              <Trash2 className='size-5' />
            </button>
          </div>
        </div>

        {/* Show Edit Card if Edit button was clicked */}
        {showEdit && (
          <div className='card items-center mt-10 container'>
            <div className="card-body border border-gray-500 bg-gray-100 rounded-xl">
              <h2 className="card-title text-2xl mb-4">Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="label mr-4">
                    <span className="label-text">Product Id</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Id of product to be updated"
                    className="input border border-gray-500 bg-gray-100"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="label mr-4">
                    <span className="label-text">Update Product Name</span>
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
                  <label className="label mr-4">
                    <span className="label-text">Update Product Price</span>
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
                  <label className="label mr-4">
                    <span className="label-text">Update Product Image</span>
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
                  <label className="label mr-4">
                    <span className="label-text">Update Product Description</span>
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
                  <label className="label mr-4">
                    <span className="label-text">Update Product Category</span>
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
                  <label className="label mr-4">
                    <span className="label-text">Update Count in Stock</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Count in Stock"
                    className="input border border-gray-500 bg-gray-100"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Show Delete Card if Delete button was clicked */}
        {showDelete && (
          <div className='card items-center mt-10'>
            <div className='card-body border border-gray-500 bg-gray-100 rounded-lg'>
              <h2 className="card-title text-2xl mb-4">Delete Product</h2>
              <form onSubmit={handleDeleteSubmit}>
                <div className="mb-4">
                  <label className="label mr-4">
                    <span className="label-text">Product Id</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Id of product to be deleted"
                    className="input border border-gray-500 bg-gray-100"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-error" disabled={loading}>
                    {loading ? "Deleting..." : "Delete Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModifyProductPage;
