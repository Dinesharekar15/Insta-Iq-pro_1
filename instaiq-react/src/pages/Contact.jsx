import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="page-content bg-white">
      {/* inner page banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Contact Us</h1>
          </div>
        </div>
      </div>
      {/* Breadcrumb row removed */}
      {/* inner page banner */}
      <div className="page-banner contact-page section-sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5 m-b30">
              <div className="bg-primary text-white contact-info-bx">
                <h2 className="m-b10 title-head">
                  Contact <span>Information</span>
                </h2>
                <div className="widget widget_getintuch">
                  <ul>
                    <li>
                      <i className="ti-location-pin"></i>Plot no 58, P&T Colony,
                      Kotwal Nagar, Pratap Nagar, Nagpur, Maharashtra 440022
                    </li>
                    <li>
                      <i className="ti-mobile"></i> 092841 84049
                    </li>
                    <li>
                      <i className="ti-email"></i>info@instaiq.in
                    </li>
                  </ul>
                </div>
                <h5 className="m-t0 m-b20">Follow Us</h5>
                <ul className="list-inline contact-social-bx">
                  <li>
                    <a
                      href="https://www.facebook.com/InstaeducationNgp"
                      className="btn outline radius-xl"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/insta_iq_crt/"
                      className="btn outline radius-xl"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@INSTA_iQ"
                      className="btn outline radius-xl"
                    >
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/instaiqcrt/"
                      className="btn outline radius-xl"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instaiq.ongraphy.com/"
                      className="btn outline radius-xl"
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <form className="contact-bx ajax-form">
                <div className="ajax-message"></div>
                <div className="heading-bx left">
                  <h2 className="title-head">Connect with us</h2>
                  &nbsp;<h5>send us your query</h5>
                </div>
                <div className="row placeani">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="name"
                          type="text"
                          required
                          className="form-control valid-character"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          required
                          placeholder="Your Email Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="phone"
                          type="text"
                          required
                          className="form-control int-value"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="subject"
                          type="text"
                          required
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          placeholder="Type Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="btn button-md"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* inner page banner END */}
    </div>
  );
};

export default Contact; 