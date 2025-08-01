import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import Axios

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Login Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // For general success messages
  const [errorMessage, setErrorMessage] = useState(null); // For login errors

  // Effect to clear success/error messages after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Error message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]); // Re-run this effect whenever messages change

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setSuccessMessage(null); // Clear any previous messages
    setErrorMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      // Store the JWT token in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store full user info including token

      setSuccessMessage("Login successful! Redirecting to home page...");
      setFormData({ // Clear password field on success (keep email for convenience if desired)
        email: formData.email, // Keep email
        password: "", // Clear password
      });

      // Redirect to the home page after successful login
      navigate('/'); // Redirect to home page

    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Login failed. Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wraper">
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}
        >
          <a href="/">
            <img src="assets/images/logo-white-2.png" alt="InstaIQ Logo" />
          </a>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Login to your <span>InstaIQ Account</span> {/* Adjusted title */}
              </h2>
              <p>
                Don't have an account? <Link to="/register">Create one here</Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
              {/* Message display area */}
              {loading && <div className="alert alert-info">Logging in...</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="row placeani">
                {/* Input for Email */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email" // Corrected name to 'email' to match backend
                        type="email" // Changed type to email
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Input for Password */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password" // Corrected name to 'password' to match backend
                        type="password"
                        className="form-control"
                        required
                        placeholder="Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="/forget-password" className="ml-auto">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
