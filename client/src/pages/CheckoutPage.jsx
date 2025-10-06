import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import { CircleAlertIcon } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  const validateAddress = (address) => {
    const pattern = /^\d+\s[A-Za-z0-9\s.,'-]+$/;
    return pattern.test(address);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check Shipping Info
    if (name.length < 6) {
      toast.error("Name field must have at least 6 characters");
      return;
    } else if (!validateAddress(address)) {
      toast.error("Invalid address");
      return;
    } else if (city.length < 2 || !/^[A-za-z]+$/.test(city)) {
      toast.error("Invalid city");
      return;
    } else if (postalCode.length < 5 || !/^[0-9]{5}$/.test(postalCode)) {
      toast.error("Invalid postal code");
      return;
    }

    // Verify cart
    if (cart.length < 1) {
      toast.error("Cart is empty");
      console.log("Error in submitting payment. Cart is empty.");
      return;
    }

    // Approve payment
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/checkout/create-payment-intent", { cartItems: cart }, { withCredentials: true });

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful 🎉");

        let totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalAmount += 5.99; // Shipping Cost
        totalAmount = totalAmount.toFixed(2);

        await axios.post("http://localhost:5000/api/orders", { userId: user.userId, cartItems: cart, totalAmount, paymentId: result.paymentIntent.id, shipping: { name, address, city, postalCode } }, { withCredentials: true });
        toast.success("Order successfully submitted!");

        localStorage.removeItem("cart");
        navigate("/profile");
      }
    } catch (error) {
      setMessage("Something went wrong");
      toast.error("Something went wrong. Please try again.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container pt-24 text-black">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        <div className="border border-gray-500 bg-gray-500 h-0.5 w-full" />

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center min-h-screen text-black">
            <div className="bg-primary/10 rounded-full p-8">
              <CircleAlertIcon className="size-10" />
            </div>
            <h3 className="text-2xl font-bold">Checkout Empty</h3>
            <p className="text-black/70">
              Your checkout cart is currently empty. Explore more products at the home page.
            </p>
            <Link to="/" className="btn btn-primary">Shop for More</Link>
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600">Address</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123 Main St"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-gray-600">City</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-gray-600">Postal Code</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="12345"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-6 my-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h3>
                    <CardElement className="border border-gray-700 p-4 my-2 rounded-lg" />
                  </div>
                  <button disabled={!stripe || loading} className="btn btn-primary">
                    {loading ? "Processing..." : "Confirm Payment"}
                  </button>
                  <p>{message}</p>
                </form>
              </div>
              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage;