import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Nw...YOUR_STRIPE_PUBLISHABLE_KEY..."); // Replace with your real key

function CheckoutForm() {
  const { state, dispatch } = useAppContext();
  const cart = state.cart;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const getPriceValue = (price) => {
    if (!price || price === "Free") return 0;
    return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
  };
  const total = cart.reduce((sum, item) => sum + getPriceValue(item.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    // In a real app, you would create a PaymentIntent on your server and confirm it here.
    // For demo, just simulate success if total > 0
    if (total === 0) {
      setSuccess(true);
      dispatch({ type: "CLEAR_CART" });
      setTimeout(() => navigate("/"), 3000);
      return;
    }
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }
    // Simulate payment success (replace with real Stripe logic in production)
    setTimeout(() => {
      setSuccess(true);
      dispatch({ type: "CLEAR_CART" });
      setProcessing(false);
      setTimeout(() => navigate("/"), 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. You will be redirected to the homepage.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Name</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Email</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} required type="email" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Card Details</label>
        <CardElement className="form-control" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Order Summary</h4>
        <ul>
          {cart.map(item => (
            <li key={item.cartId}>{item.title} - {item.price}</li>
          ))}
        </ul>
        <strong>Total: ₹{total.toLocaleString()}</strong>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button className="btn btn-success" type="submit" disabled={processing || !stripe}>
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

const Checkout = () => (
  <div className="page-content bg-white" style={{ paddingTop: 100 }}>
    <div className="container" style={{ padding: 40, maxWidth: 700 }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  </div>
);

export default Checkout; 