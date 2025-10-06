import { Link } from "react-router";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const OrderSummary = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unloadCart = () => {
      try {
        const storedCartData = localStorage.getItem("cart");

        if (storedCartData) {
          const cartData = JSON.parse(storedCartData);
          setCart(cartData);
        } else {
          throw new Error("Empty cart");
        }
      } catch (error) {
        console.log("Error in retrieving cart items from local storage.", error);
        toast.error("Failed to load cart items");
      }
    }

    unloadCart();
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal > 0 ? subtotal + shipping : subtotal;

  const handleDelete = (item) => {
    if (!window.confirm("Are you sure you want to delete this item from your cart?")) {
      return;
    }

    try {
      const storedCartData = localStorage.getItem("cart");

      if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        let newCartData = cartData.filter(obj => obj.productId !== item.productId);

        setCart(newCartData);
        localStorage.setItem("cart", JSON.stringify(newCartData));

        toast.success("Product successfully removed from cart");
      } else {
        throw new Error("Cart is empty");
      }
    } catch (error) {
      console.log("Error in retrieving cart items from local storage.", error);
      toast.error("Failed to remove cart item");
    }
  }

  const handleSubtractQuantity = (item) => {
    try {
      const storedCartData = localStorage.getItem("cart");

      if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        const index = cartData.findIndex(obj => obj.productId === item.productId);

        if (index !== -1) {
          cartData[index].quantity -= 1;
        } else {
          throw new Error("Failed to locate product index");
        }

        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    } catch (error) {
      console.log("Error in retrieving cart item from local storage.", error);
      toast.error("Failed to add quantity to cart item");
    }
  }

  const handleAddQuantity = (item) => {
    try {
      const storedCartData = localStorage.getItem("cart");

      if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        const index = cartData.findIndex(obj => obj.productId === item.productId);

        if (index !== -1 && item.quantity < item.stock) {
          cartData[index].quantity += 1;
        } else if (index !== -1 && item.quantity >= item.stock) {
          toast.error("Max quantity for the product reached");
          item.quantity = item.stock;
          return;
        } else {
          throw new Error("Failed to locate product index");
        }

        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    } catch (error) {
      console.log("Error in retrieving cart item from local storage.", error);
      toast.error("Failed to add quantity to cart item");
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <div className="flex flex-col items-center space-y-2">
              <Link to={`/product/${item.productId}`}>
                <img src={item.image} className="size-10" />
              </Link>
              <div className="flex items-center justify-center space-x-1">
                <button className="btn btn-error size-5 rounded-2xl" onClick={() => handleDelete(item)}>x</button>
                <button className="btn btn-primary size-5 rounded-2xl" onClick={() => item.quantity > 1 ? handleSubtractQuantity(item) : handleDelete(item)}>-</button>
                <button className="btn btn-primary size-5 rounded-2xl" onClick={() => handleAddQuantity(item)}>+</button>
              </div>
            </div>
            <p className="text-gray-600">{item.name} (x{item.quantity})</p>
            <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;