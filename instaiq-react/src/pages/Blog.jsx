import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      date: "June 10, 2025",
      author: "Amit Aswale",
      title: "All India Placement Aptitude Test by INSTA iQ",
      description: "A brilliant initiative for self‑assessment and performance analysis of students across UG and PG levels.",
      link: "/blog-details1"
    },
    {
      id: 2,
      date: "October 5, 2024",
      author: "Amit Aswale",
      title: "TCS iON NQT National Qualifier Test",
      description: "Get yourself ready for the TCS recruitment. Last date to apply: 24th October 2024. Exam Date: 6th November 2024.",
      link: "/blog-details2"
    },
    {
      id: 3,
      date: "May 31, 2024",
      author: "Amit Aswale",
      title: "Capgemini Recruitment Process",
      description: "Capgemini's process includes multiple rounds to assess aptitude, communication, and technical abilities.",
      link: "/blog-details3"
    }
  ];

  return (
    <div className="page-content bg-white">
      {/* Page Heading Box */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner1.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Blog</h1>
          </div>
        </div>
      </div>
      {/* Page Heading Box END */}

      {/* Page Content Box */}
      <div className="content-block">
        {/* Blog Grid */}
        <div className="section-area section-sp1">
          <div className="container">
            <div className="ttr-blog-grid-3 row" id="masonry">
              {blogPosts.map((post) => (
                <div
                  className="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40"
                  key={post.id}
                >
                  <div className="recent-news">
                    <div className="action-box"></div>
                    <div className="info-bx">
                      <ul className="media-post">
                        <li>
                          <a href="#">
                            <i className="fa fa-calendar"></i>{post.date}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-user"></i>{post.author}
                          </a>
                        </li>
                      </ul>
                      <h5 className="post-title">
                        <Link to={post.link}>{post.title}</Link>
                      </h5>
                      <p>{post.description}</p>
                      <div className="post-extra">
                        <Link to={post.link} className="btn-link">
                          READ MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Blog Grid END */}
      </div>
      {/* Page Content Box END */}
    </div>
  );
};

export default Blog; 