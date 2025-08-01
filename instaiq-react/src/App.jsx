import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import page components
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import About from "./pages/About";
import DigitalProducts from "./pages/DigitalProducts";
import Membership from "./pages/Membership";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";

import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import Profile from "./pages/profile"; // Import the Profile component
// import AdminPanel from "./pages/AdminPanel"; // Import the AdminPanel component
// Main App component with routing
function App() {
  return (
    <Router>
      {/* Layout wraps all pages with header/footer/navigation */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin" element={<AdminPanel />} /> */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} /> {/* Added the Profile route */}
          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
