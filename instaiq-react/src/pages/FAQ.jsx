import React, { useState } from "react";

const faqs = [
  {
    question: "What is InstaIQ?",
    answer:
      "InstaIQ is an AI-powered educational platform designed to help students prepare for campus placements, competitive exams, and career growth through personalized learning paths, quizzes, resume building tools, job portals, and more.",
  },
  {
    question: "Is InstaIQ free to use?",
    answer:
      "InstaIQ offers both free and premium services. Core features like practice quizzes and career tips are free, while advanced features such as AI-based learning paths and job matching may require a membership.",
  },
  {
    question: "Are mock interviews and preparation included?",
    answer:
      "Yes! We offer mock interview modules, common HR and technical question banks, and tips to boost your confidence before real interviews.",
  },
  {
    question: "How do I register or log in?",
    answer:
      "Click on the “Register” or “Login” button on the homepage. You can sign up using email, Google, or through your college credentials (if integrated).",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Click on “Forgot Password” on the login page, enter your email, and follow the steps to reset your password.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(/assets/images/banner/banner1.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Frequently Asked Questions</h1>
          </div>
        </div>
      </div>
      {/* FAQ Section - matches faq-1.html */}
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="heading-bx left">
                  <h2 className="m-b10 title-head">Asked <span> Questions</span></h2>
                </div>
                <p className="m-b10">
                  Find answers to common questions about InstaIQ’s features, services, and how we help students succeed in their careers. Whether you're a new user or just exploring, these FAQs will guide you through everything you need to know.
                </p>
                <div className="ttr-accordion m-b30 faq-bx" id="accordion1">
                  {faqs.map((faq, idx) => (
                    <div className="panel" key={idx}>
                      <div className="acod-head">
                        <h6 className="acod-title">
                          <a
                            href="#"
                            className={openIndex === idx ? "" : "collapsed"}
                            aria-expanded={openIndex === idx}
                            onClick={e => {
                              e.preventDefault();
                              handleToggle(idx);
                            }}
                          >
                            {faq.question}
                          </a>
                        </h6>
                      </div>
                      <div
                        id={`faq${idx + 1}`}
                        className={`acod-body collapse${openIndex === idx ? " show" : ""}`}
                      >
                        <div className="acod-content">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="m-b10">
                  Wondering how InstaIQ works, what services we offer, or how to get started? You're in the right place! Browse through our most commonly asked questions to learn more about how InstaIQ can support your academic and career journey.
                </p>
                {/* Feature boxes removed as per user request */}
              </div>
              {/* Removed the right-side contact form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 