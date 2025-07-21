import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // For API calls

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Profile Page):", import.meta.env.VITE_BACKEND_URL);

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "", // For password update
    confirmPassword: "", // For password confirmation
    purchasedCourses: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // For update form submission
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Effect to fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) {
        // If no user info, redirect to login
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.token;

        // Fetch user profile
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_BASE_URL}/users/profile`, config);

        // Fetch purchased courses separately (as profile might not populate full course details)
        const { data: purchasedCoursesData } = await axios.get(`${API_BASE_URL}/users/purchased-courses`, config);

        setUserData({
          name: data.name,
          email: data.email,
          password: "", // Keep password field empty for security
          confirmPassword: "",
          purchasedCourses: purchasedCoursesData,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        setErrorMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : "Failed to load profile. Please try logging in again."
        );
        // If token is invalid or expired, redirect to login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // navigate is a dependency of useEffect

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
  }, [successMessage, errorMessage]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle profile update submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      setErrorMessage("You are not logged in.");
      setSubmitting(false);
      navigate('/login');
      return;
    }
    const parsedUserInfo = JSON.parse(userInfo);
    const token = parsedUserInfo.token;

    // Prepare data for update
    const updateData = {
      name: userData.name,
      email: userData.email,
    };

    if (userData.password) {
      if (userData.password !== userData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setSubmitting(false);
        return;
      }
      updateData.password = userData.password;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`${API_BASE_URL}/users/profile`, updateData, config);

      // Update localStorage with new user info if name or email changed
      const updatedUserInfo = { ...parsedUserInfo, name: data.name, email: data.email };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      setSuccessMessage("Profile updated successfully!");
      // Clear password fields after successful update
      setUserData(prev => ({ ...prev, password: "", confirmPassword: "" }));

    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to update profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="container" style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">User Profile</h1>
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              {/* Profile Details Column */}
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="widget-box bg-white p-4 rounded shadow">
                  <h3 className="widget-title style-1 m-b20" style={{ color: '#000' }}>Your Profile Information</h3>
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">New Password (optional):</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? "Updating..." : "Update Profile"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Purchased Courses Column */}
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="widget-box bg-white p-4 rounded shadow">
                  <h3 className="widget-title style-1 m-b20" style={{ color: '#000' }}>Your Purchased Courses</h3>
                  {userData.purchasedCourses.length === 0 ? (
                    <p>You have not purchased any courses yet.</p>
                  ) : (
                    <ul className="list-group">
                      {userData.purchasedCourses.map((course) => (
                        <li key={course._id} className="list-group-item d-flex align-items-center mb-2 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <img
                            src={course.imageUrl || 'https://placehold.co/50x50/cccccc/333333?text=No+Image'}
                            alt={course.title}
                            className="img-thumbnail mr-3"
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <div className="ml-3">
                            <h5 className="mb-0" style={{ color: '#000' }}>{course.title}</h5>
                            <small className="text-muted">{course.description.substring(0, 50)}...</small>
                            <p className="mb-0 font-weight-bold" style={{ color: '#000' }}>₹{course.price.toFixed(2)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
