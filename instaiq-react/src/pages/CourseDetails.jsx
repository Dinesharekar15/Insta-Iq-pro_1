import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

// Keep in sync with Courses.jsx
const courses = [
  {
    img: "assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta iQ",
    price: "Free",
    oldPrice: null,
    membership: false,
    badge: "FREE",
    description: "A free, national-level aptitude test for students to assess their placement readiness. Includes Quantitative, Logical, and Verbal sections. Conducted by Insta iQ.",
    details: [
      "Covers Quantitative, Logical, and Verbal Aptitude",
      "Open to all students",
      "Get a detailed performance report",
      "Completely free of cost"
    ]
  },
  {
    img: "assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    membership: true,
    badge: "Included in Membership",
    description: "Comprehensive course to master all placement aptitude topics. Includes video lectures, practice tests, and live sessions.",
    details: [
      "Covers all major placement aptitude topics",
      "Video lectures and practice questions",
      "Live doubt sessions",
      "Certificate on completion"
    ]
  },
  {
    img: "assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Learn advanced Excel skills and data analysis techniques for business and research. Includes hands-on projects.",
    details: [
      "Advanced Excel formulas and tools",
      "Data visualization and dashboards",
      "Real-world data analysis projects",
      "Suitable for business and research"
    ]
  },
  {
    img: "assets/images/courses/course4.jpg",
    title: "TCS NQT - MOCK TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹2,999",
    membership: true,
    badge: "Included in Membership",
    description: "Simulate the real TCS NQT exam with this mock test. Get instant results and detailed solutions.",
    details: [
      "Based on latest TCS NQT pattern",
      "Instant result and feedback",
      "Detailed solutions for all questions",
      "Affordable price"
    ]
  },
  {
    img: "assets/images/courses/course5.jpg",
    title: "COGNIZANT ASSESSMENT COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Cognizant's recruitment process with targeted practice and expert guidance.",
    details: [
      "Cognizant-specific aptitude and coding practice",
      "Interview preparation",
      "Expert guidance and tips",
      "Included in membership"
    ]
  },
  {
    img: "assets/images/courses/course6.jpg",
    title: "ACCENTURE MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: false,
    badge: null,
    description: "Take a mock test for Accenture's recruitment exam. Practice real questions and improve your chances.",
    details: [
      "Accenture exam pattern questions",
      "Timed test environment",
      "Performance analysis",
      "Ideal for final preparation"
    ]
  },
  {
    img: "assets/images/courses/course7.jpg",
    title: "WIPRO MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹199",
    oldPrice: "₹499",
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Wipro's recruitment process with this comprehensive mock test. Practice real questions and improve your performance.",
    details: [
      "Wipro-specific exam pattern",
      "Timed mock test environment",
      "Detailed performance analysis",
      "Included in membership"
    ]
  },
  {
    img: "assets/images/courses/course8.jpg",
    title: "INFOSYS MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹149",
    oldPrice: "₹399",
    membership: true,
    badge: "Included in Membership",
    description: "Master Infosys recruitment with targeted practice tests. Get familiar with their unique question patterns and time management.",
    details: [
      "Infosys exam pattern questions",
      "Real-time test simulation",
      "Performance tracking and analytics",
      "Included in membership"
    ]
  },
  {
    img: "assets/images/courses/course9.jpg",
    title: "HCL MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹299",
    membership: true,
    badge: "Included in Membership",
    description: "Ace HCL's recruitment process with our specialized mock test. Practice with questions designed to match their exact pattern.",
    details: [
      "HCL-specific question patterns",
      "Timed test environment",
      "Instant results and feedback",
      "Included in membership"
    ]
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const { dispatch } = useAppContext();
  const [added, setAdded] = useState(false);
  const course = courses[parseInt(id, 10)];

  if (!course) {
    return (
      <div className="page-content bg-white">
        <div className="container" style={{ padding: 80, textAlign: "center" }}>
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist.</p>
          <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...course, cartId: id } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-content bg-white">
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{course.title}</h1>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="course-details">
                  <img src={course.img} alt={course.title} style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 24 }} />
                  <h2>{course.title}</h2>
                  <div style={{ color: "#888", fontSize: 15, marginBottom: 8 }}>{course.provider}</div>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
                    {course.oldPrice && <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>{course.oldPrice}</span>}
                    {course.price}
                  </div>
                  <p>{course.description}</p>
                  <ul>
                    {course.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {added && <div style={{ color: 'green', marginTop: 10 }}>Added to cart!</div>}
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="course-sidebar">
                  <div className="widget">
                    <h5 className="widget-title">Course Info</h5>
                    <ul>
                      <li>Provider: <span>{course.provider}</span></li>
                      <li>Price: <span>{course.price}</span></li>
                      {course.oldPrice && <li>Old Price: <span>{course.oldPrice}</span></li>}
                      {course.badge && <li>Badge: <span>{course.badge}</span></li>}
                      {course.rating && <li>Rating: <span>{course.rating} ({course.ratingsCount} ratings)</span></li>}
                    </ul>
                  </div>
                  <div className="widget">
                    <button onClick={handleAddToCart} className="btn btn-block btn-primary" disabled={added}>
                      {added ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 