import React from "react";

const Login = () => {
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
                Login to your <span>InstaIQ Admin Account</span>
              </h2>
              <p>
                Don't have an account? <a href="/register">Create one here</a>
              </p>
            </div>
            <form className="contact-bx">
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="dzName"
                        type="text"
                        required
                        className="form-control"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        type="password"
                        className="form-control"
                        required
                        placeholder="Your Password"
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
                  >
                    Login
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