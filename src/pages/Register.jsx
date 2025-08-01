import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import Axios

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Register Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Effect to clear success/error messages after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        // Optional: Redirect to login page after successful registration
        navigate('/login');
      }, 3000); // Message disappears after 3 seconds, then redirects
      return () => clearTimeout(timer);
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Error message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, navigate]); // Re-run this effect whenever messages or navigate changes

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
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      setSuccessMessage(response.data.message || "Registration successful! Redirecting to login...");
      setFormData({ // Clear form fields on success
        name: "",
        email: "",
        password: "",
      });
      // The useEffect hook will handle the redirection after the message
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Registration failed. Please try again."
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
                Sign Up <span>Now</span>
              </h2>
              <p>
                Login Your Account <Link to="/login">Click here</Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
              {/* Message display area */}
              {loading && <div className="alert alert-info">Registering...</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="name" // Corrected name to 'name' to match backend
                        type="text"
                        required
                        className="form-control"
                        placeholder="username or email"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email" // Corrected name to 'email' to match backend
                        type="email"
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
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

export default Register;
