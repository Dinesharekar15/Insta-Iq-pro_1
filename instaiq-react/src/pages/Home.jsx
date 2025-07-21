import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Home Page):", import.meta.env.VITE_BACKEND_URL);

// Images (relative to public/assets/) - These are static assets, not from backend
const serviceImages = [
  "assets/images/our-services/pic1.jpg",
  "assets/images/our-services/pic2.jpg",
  "assets/images/our-services/pic3.jpg",
];

const eventImages = [
  "assets/images/event/pic4.jpg",
  "assets/images/event/pic3.jpg",
  "assets/images/event/pic2.jpg",
];
const testimonialImages = [
  "assets/images/testimonials/pic1.jpg",
  "assets/images/testimonials/pic2.jpg",
];
const newsImages = [
  "assets/images/blog/latest-blog/pic1.jpg",
  "assets/images/blog/latest-blog/pic2.jpg",
  "assets/images/blog/latest-blog/pic3.jpg",
];

export const allEvents = [
  {
    img: "/assets/images/event/1.png",
    date: "15",
    month: "July",
    title: "AI in Career Guidance Workshop",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences , and career goals."
  },
  {
    img: "/assets/images/event/2.png",
    date: "21",
    month: "August",
    title: "Resume Building Bootcamp ",
    time: "11:00am 12:00am",
    location: "Nagpur , India",
    desc: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus  placements,with templates optimized for ATS."
  },
  {
    img: "/assets/images/event/3.png",
    date: "29",
    month: "August",
    title: "Aptitude Mastery to Succeed in Competitive Exams",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests and competitive exams."
  }
];

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  // Check login status on component mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Run once on mount

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/courses`);
        const fetchedCourses = response.data.map(course => ({
          _id: course._id,
          img: course.imageUrl,
          title: course.title,
          provider: "Insta Education",
          price: `₹${course.price.toFixed(2)}`,
          oldPrice: null,
          badge: course.price === 0 ? "FREE" : null,
        }));
        setCourses(fetchedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const homeBtnStyle = {
    borderRadius: 10,
    minWidth: 120,
    minHeight: 40,
    fontWeight: 600,
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'inline-block',
  };

  return (
    <div className="page-content bg-white">
      {/* Hero/Main Slider (static for now) */}
      <section className="rev-slider" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", maxHeight: 500, position: "relative" }}>
          <img
            src="assets/images/slider/slide1.jpg"
            alt="Hero"
            style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(2,0,11,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 2
          }}>
            <h2 style={{ fontSize: 50, fontWeight: 700 }}>Welcome To InstaIQ</h2>
            <h4 style={{ fontSize: 24, margin: "10px 0" }}>Master Placement Aptitude & Excel in Your Career</h4>
            <p style={{ maxWidth: 600, textAlign: "center" }}>
              Join thousands of students who have successfully cracked placement tests with our comprehensive aptitude courses, mock tests, and expert guidance.
            </p>
            <div style={{ marginTop: 20 }}>
              <Link to="/courses" className="btn radius-xl" style={{ ...homeBtnStyle, marginRight: 10 }}>BROWSE COURSES</Link>
              {isLoggedIn ? (
                <Link to="/profile" className="btn radius-xl" style={homeBtnStyle}>PROFILE</Link>
              ) : (
                <Link to="/login" className="btn radius-xl" style={homeBtnStyle}>LOGIN</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-area content-inner service-info-bx" style={{ marginTop: 40 }}>
        <div className="container">
          <div className="row">
            {[
              { title: "Mock Tests & Practice", icon: "fa-file-text-o", img: serviceImages[0] },
              { title: "Aptitude Training", icon: "fa-book", img: serviceImages[1] },
              { title: "Career Guidance", icon: "fa-users", img: serviceImages[2] },
            ].map((service, idx) => (
              <div className="col-lg-4 col-md-4 col-sm-6" key={service.title}>
                <div className="service-bx">
                  <div className="action-box">
                    <img src={service.img} alt={service.title} />
                  </div>
                  <div className="info-bx text-center">
                    <div className="feature-box-sm radius bg-white">
                      <i className={`fa ${service.icon} text-primary`}></i>
                    </div>
                    <h4><a href="#">{service.title}</a></h4>
                    <a href="#" className="btn radius-xl">View More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section-area section-sp2 popular-courses-bx">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head">Popular <span>Courses</span></h2>
              <p style={{ color: '#fff', fontSize: 18, marginBottom: 24 }}>Master placement aptitude with our most popular courses designed by industry experts</p>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : courses.length === 0 ? (
              <p>No courses available at the moment.</p>
            ) : (
              courses.map((course) => (
                <div className="col-md-4 col-sm-6 mb-4" key={course._id}>
                  <div className="cours-bx d-flex flex-column h-100" style={{
                    minHeight: 340,
                    background: '#ffe6b3',
                    borderRadius: 12,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="action-box" style={{ position: 'relative' }}>
                        <img src={course.img} alt={course.title} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                        {course.badge && (
                          <span style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: course.badge === "FREE" ? "#27ae60" : "#e67e22",
                            color: "#fff",
                            borderRadius: 6,
                            padding: "2px 10px",
                            fontSize: 13,
                            zIndex: 2
                          }}>
                            {course.badge}
                          </span>
                        )}
                      </div>
                      <div className="info-bx text-center" style={{ padding: '12px', flexGrow: 1 }}>
                        <h5 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Link to={`/course-details/${course._id}`}>{course.title}</Link>
                        </h5>
                        <span style={{ color: '#444', fontSize: 15 }}>{course.provider}</span>
                      </div>
                      <div className="price" style={{ margin: '0 12px 12px 12px', textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#222' }}>
                        {course.oldPrice && <del style={{ color: '#888', marginRight: 8, fontSize: 16 }}>{course.oldPrice}</del>}
                        <span>{course.price}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center" style={{ padding: '0 12px 12px 12px', background: 'transparent' }}>
                      <Link to={`/course-details/${course._id}`} className="btn" style={{ ...homeBtnStyle, width: '100%', margin: 0, borderRadius: 10, textAlign: 'center' }}>Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center" style={{ marginTop: 30 }}>
            <Link to="/courses" className="btn" style={homeBtnStyle}>View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Online Courses Search Section */}
      <section className="section-area section-sp1 ovpr-dark bg-fix online-cours" style={{ backgroundImage: "url(assets/images/background/bg1.png)", backgroundSize: "cover" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-white">
              <h2>Master Placement Aptitude</h2>
              <h5>Join thousands of students who cracked their dream jobs</h5>
              <form className="cours-search" onSubmit={e => e.preventDefault()}>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for aptitude courses, mock tests..." />
                  <div className="input-group-append">
                    <button className="btn" type="submit" style={homeBtnStyle}>Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mw800 m-auto">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-user"></i><span className="counter">10</span>K+</h3>
                  </div>
                  <span className="cours-search-text">Students Placed</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-book"></i><span className="counter">9</span></h3>
                  </div>
                  <span className="cours-search-text">Specialized Courses</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-layout-list-post"></i><span className="counter">95</span>%</h3>
                  </div>
                  <span className="cours-search-text">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-area section-sp2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center heading-bx">
              <h2 className="title-head m-b0">Upcoming <span>Events</span></h2>
              <p className="m-b0">Upcoming Education Events To Feed Brain. </p>
            </div>
          </div>
          <div className="row">
            {allEvents.map((event, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div className="event-bx d-flex flex-column h-100" style={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffe6b3', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', width: '100%' }}>
                  <div className="action-box" style={{ position: 'relative' }}>
                    <img src={event.img} alt={event.title} style={{ width: '100%', height: 150, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'block' }} />
                  </div>
                  <div className="info-bx text-center" style={{ padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                      <div className="event-time" style={{ background: '#2563eb', color: '#fff', borderRadius: 8, padding: '8px 16px', marginRight: 10, minWidth: 60 }}>
                        <div className="event-date" style={{ fontSize: 24, fontWeight: 700 }}>{event.date}</div>
                        <div className="event-month" style={{ fontSize: 14 }}>{event.month}</div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h5 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{event.title}</h5>
                        <ul className="media-post" style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: 13, color: '#444' }}>
                          <li style={{ display: 'inline', marginRight: 10 }}><i className="fa fa-clock-o"></i> {event.time}</li>
                          <li style={{ display: 'inline' }}><i className="fa fa-map-marker"></i> {event.location}</li>
                        </ul>
                      </div>
                    </div>
                    <p style={{ color: '#444', fontSize: 15, marginTop: 8 }}>{event.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/events" className="btn" style={homeBtnStyle}>View All Events</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-area section-sp2 bg-fix ovbl-dark" style={{ backgroundImage: "url(assets/images/background/bg1.jpg)", backgroundSize: "cover" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-white heading-bx left">
              <h2 className="title-head text-uppercase">what people <span>say</span></h2>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
            </div>
          </div>
          <div className="row">
            {testimonialImages.map((img, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="testimonial-bx">
                  <div className="testimonial-thumb">
                    <img src={img} alt="Testimonial" />
                  </div>
                  <div className="testimonial-info">
                    <h5 className="name">Peter Packer</h5>
                    <p>-Art Director</p>
                  </div>
                  <div className="testimonial-content">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
