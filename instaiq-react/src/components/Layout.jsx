import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Layout component wraps all pages with header and footer
const Layout = ({ children }) => {
  return (
    <>
      {/* Header on every page */}
      <Header />
      {/* Main content */}
      <main>{children}</main>
      {/* Footer on every page */}
      <Footer />
    </>
  );
};

export default Layout; 