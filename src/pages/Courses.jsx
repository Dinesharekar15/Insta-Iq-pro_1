import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Courses Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

// Original static data (will be replaced by fetched data for main courses)
// Keeping it commented out for reference, but the component will use fetched data.
const coursesData = [
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
  const [allFetchedCourses, setAllFetchedCourses] = useState([]); // Stores all courses from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [page, setPage] = useState(1);

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/courses`);
        // Map backend data to your frontend structure
        const fetchedCourses = response.data.map(course => ({
          _id: course._id, // Keep the backend ID
          img: course.imageUrl, // Use imageUrl from backend
          title: course.title,
          provider: "Insta Education", // Static for now, or fetch from backend if available
          price: `₹${course.price.toFixed(2)}`, // Format price
          oldPrice: null, // Not available from backend currently
          membership: course.price > 0, // Basic membership logic
          badge: course.price === 0 ? "FREE" : (course.price > 0 ? "Included in Membership" : null), // Badge logic
          rating: null, // Not available from backend currently
          ratingsCount: null, // Not available from backend currently
        }));
        setAllFetchedCourses(fetchedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        // Fallback to static data
        setAllFetchedCourses(coursesData.map((course, idx) => ({ ...course, _id: idx })));
        setError(null); // Don't show error if using fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on mount

  // Filter courses by search and category (now based on fetched data)
  const filteredCourses = allFetchedCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All Courses" ||
        // This category filtering logic is basic and assumes category is part of title.
        // For robust category filtering, your backend would need a 'category' field on courses.
        // For now, it will filter based on title containing the category name.
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
    setPage(1); // Reset to first page on category change
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
                          setPage(1); // Reset to first page on search
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
                {/* Recent Courses widget - remains static for now */}
                <div className="widget recent-posts-entry">
                  <h5 className="widget-title style-1">Recent Courses</h5>
                  <div className="widget-post-bx">
                    {recentCourses.map((course, idx) => (
                      <div className="widget-post clearfix" key={idx}>
                        <div className="ttr-post-media">
                          <img src={course.img} width="200" height="140" alt={course.title} />
                        </div>
                        <div className="ttr-post-info">
                          <h6 className="post-title"><Link to="#">{course.title}</Link></h6>
                          <ul className="media-post">
                            <li><Link to="#"><i className="fa fa-user"></i>{course.provider}</Link></li>
                            <li><Link to="#"><i className="fa fa-money"></i>{course.price}</Link></li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Course Grid */}
              <div className="col-lg-10 col-md-8 col-sm-12">
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center text-muted">Loading courses...</div>
                  ) : error ? (
                    <div className="col-12 text-center text-danger">{error}</div>
                  ) : paginatedCourses.length === 0 ? (
                    <div className="col-12 text-center text-muted">No courses found matching your criteria.</div>
                  ) : (
                    paginatedCourses.map((course) => (
                      <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={course._id}> {/* Use _id for key */}
                        <div className="cours-bx d-flex flex-column h-100" style={{
                          minHeight: 350,
                          background: '#ffe6b3',
                          borderRadius: 12,
                          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                          overflow: 'hidden' // Ensure border-radius clips image
                        }}>
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
                            <div className="card-body" style={{ padding: '16px', flexGrow: 1 }}>
                              <h5 className="card-title" style={{ fontWeight: 500, fontSize: 18, minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Link to={`/course-details/${course._id}`}>{course.title}</Link> {/* Use _id for Link */}
                              </h5>
                              <div style={{ color: "#888", fontSize: 15 }}>{course.provider}</div>
                              {course.rating && ( // Display rating if available
                                <div className="rating-bx" style={{ marginTop: 8 }}>
                                  <ul className="media-post" style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <li key={i}><i className={`fa fa-star${i < course.rating ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2 }}></i></li>
                                    ))}
                                    <li style={{ marginLeft: 5, fontSize: 14, color: '#555' }}>({course.ratingsCount})</li>
                                  </ul>
                                </div>
                              )}
                              <div style={{ fontWeight: 600, fontSize: 18, marginTop: 8 }}>
                                {course.oldPrice && <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>{course.oldPrice}</span>}
                                {course.price}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: '0 16px 16px 16px' }}>
                            <Link to={`/course-details/${course._id}`} className="btn btn-primary w-100" style={{ borderRadius: 8 }}>
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
