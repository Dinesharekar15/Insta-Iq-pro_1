import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const cart = state.cart;
  const navigate = useNavigate();

  // Calculate total (ignore 'Free' and null prices)
  const getPriceValue = (price) => {
    if (!price || price === "Free") return 0;
    // Remove currency symbols and commas
    return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
  };
  const total = cart.reduce((sum, item) => sum + getPriceValue(item.price), 0);

  const handleRemove = (cartId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: cartId });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="page-content bg-white" style={{ paddingTop: 100 }}>
      <div className="container" style={{ padding: 40, maxWidth: 900 }}>
        <h1 style={{ marginBottom: 32 }}>Your Cart</h1>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888" }}>
            <p>Your cart is empty.</p>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered" style={{ background: "#fff" }}>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Provider</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.cartId}>
                      <td style={{ minWidth: 200 }}>
                        <img src={item.img} alt={item.title} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4, marginRight: 12 }} />
                        <Link to={`/course-details/${item.cartId}`}>{item.title}</Link>
                      </td>
                      <td>{item.provider}</td>
                      <td>{item.price || "-"}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.cartId)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: "right", marginTop: 24 }}>
              <h4>Total: ₹{total.toLocaleString()}</h4>
              <button className="btn btn-success" onClick={handleCheckout} style={{ marginTop: 12 }}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 