import React, { useState } from "react";
import { Link } from "react-router-dom";

// Original courses array (unchanged)
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
  },
];

const categories = [
  "All Courses",
  "General",
  "IT & Software",
  "Photography",
  "Programming Language",
  "Technology",
];

const recentCourses = [
  {
    img: "assets/images/blog/recent-blog/pic1.jpg",
    title: "Introduction InstaIQ",
    price: "₹120",
    oldPrice: "₹190",
    provider: "Insta iQ",
  },
  {
    img: "assets/images/blog/recent-blog/pic3.jpg",
    title: "English For Tomorrow",
    price: "Free",
    oldPrice: null,
    provider: "Insta Education",
  },
];

const COURSES_PER_PAGE = 6;

const Courses = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [page, setPage] = useState(1);

  // Filter courses by search and category
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All Courses" ||
        (selectedCategory !== "All Courses" && course.title.toLowerCase().includes(selectedCategory.toLowerCase())))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * COURSES_PER_PAGE,
    page * COURSES_PER_PAGE
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Our Courses</h1>
          </div>
        </div>
      </div>
      {/* Breadcrumb row removed */}
      {/* Main Content */}
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
              <div className="col-lg-2 col-md-4 col-sm-12 m-b30">
                <div className="widget courses-search-bx placeani">
                  <div className="form-group">
                    <div className="input-group">
                      <label>Search Courses</label>
                      <input
                        name="dzName"
                        type="text"
                        required
                        className="form-control"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="widget widget_archive">
                  <h5 className="widget-title style-1">All Courses</h5>
                  <ul>
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        style={{ cursor: "pointer", fontWeight: selectedCategory === cat ? "bold" : "normal" }}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget">
                  <a href="#">
                    <img src="assets/images/adv/adv.jpg" alt="" />
                  </a>
                </div>
                {/* Recent Courses widget removed */}
              </div>
              {/* Course Grid */}
              <div className="col-lg-10 col-md-8 col-sm-12">
                <div className="row">
                  {paginatedCourses.length === 0 ? (
                    <div className="col-12 text-center text-muted">No courses found.</div>
                  ) : (
                    paginatedCourses.map((course, idx) => (
                      <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={idx}>
                        <div className="cours-bx d-flex flex-column h-100" style={{ minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ position: "relative" }}>
                              <img
                                src={course.img}
                                alt={course.title}
                                className="card-img-top"
                                style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 180, objectFit: "cover" }}
                              />
                              {course.membership && (
                                <span style={{ position: "absolute", top: 12, left: 12, background: "#e67e22", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>
                                  {course.badge}
                                </span>
                              )}
                              {course.badge === "FREE" && (
                                <span style={{ position: "absolute", top: 12, right: 12, background: "#27ae60", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <div className="card-body">
                              <h5 className="card-title" style={{ fontWeight: 500, fontSize: 18 }}>{course.title}</h5>
                              <div style={{ color: "#888", fontSize: 15 }}>{course.provider}</div>
                              <div style={{ fontWeight: 600, fontSize: 18, marginTop: 8 }}>
                                {course.oldPrice && <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>{course.oldPrice}</span>}
                                {course.price}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: 16 }}>
                            <Link to={`/course-details/${(page - 1) * COURSES_PER_PAGE + idx}`} className="btn btn-primary w-100" style={{ borderRadius: 8 }}>
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Pagination (dynamic) */}
                  {totalPages > 1 && (
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <ul className="pagination">
                          <li className={`previous${page === 1 ? " disabled" : ""}`}>
                            <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ background: "none", border: "none" }}>
                              <i className="ti-arrow-left"></i> Prev
                            </button>
                          </li>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i} className={page === i + 1 ? "active" : ""}>
                              <button onClick={() => setPage(i + 1)} style={{ background: "none", border: "none" }}>{i + 1}</button>
                            </li>
                          ))}
                          <li className={`next${page === totalPages ? " disabled" : ""}`}>
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ background: "none", border: "none" }}>
                              Next <i className="ti-arrow-right"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End Course Grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses; 