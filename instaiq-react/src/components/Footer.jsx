import React from "react";

// Footer component with template styling (gallery removed)
const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="pt-exebar">
          <div className="container">
            <div className="d-flex align-items-stretch">
              <div className="pt-logo mr-auto">
                <a href="/"><img src="assets/images/logo-white.png" alt="Logo" /></a>
              </div>
              {/* Social icons removed */}
              <div className="pt-btn-join">
                <a href="/register" className="btn ">Join Now</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Newsletter signup removed */}
            <div className="col-12 col-lg-5 col-md-7 col-sm-12 mx-auto">
              <div className="row">
                <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="widget footer_widget">
                    <h5 className="footer-title">Company</h5>
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="/faq">FAQs</a></li>
                      <li><a href="/contact">Contact</a></li>
                      <li><a href="/admin">Admin</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="widget footer_widget">
                    <h5 className="footer-title">Get In Touch</h5>
                    <ul>
                      <li><a href="/blog">Blog</a></li>
                      <li><a href="/events">Events</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                  <div className="widget footer_widget">
                    <h5 className="footer-title">Courses</h5>
                    <ul>
                      <li><a href="/courses">Courses</a></li>
                      <li><a href="/course-details/0">Details</a></li>
                      <li><a href="/profile">Profile</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <a target="_blank" rel="noopener noreferrer" href="https://instaiq.in">instaiq.in</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 