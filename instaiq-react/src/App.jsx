import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import page components (to be created)
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
import BlogDetails1 from "./pages/BlogDetails1";
import BlogDetails2 from "./pages/BlogDetails2";
import BlogDetails3 from "./pages/BlogDetails3";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";

// Main App component with routing
function App() {
  return (
    <Router>
      {/* Layout wraps all pages with header/footer/navigation */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog-details1" element={<BlogDetails1 />} />
          <Route path="/blog-details2" element={<BlogDetails2 />} />
          <Route path="/blog-details3" element={<BlogDetails3 />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 