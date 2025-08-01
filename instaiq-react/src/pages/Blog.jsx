import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios

// This component fetches and displays a list of blog posts from the backend.
const Blog = () => {
  // State to store the blog posts fetched from the API
  const [blogPosts, setBlogPosts] = useState([]);
  // State to handle the loading status
  const [loading, setLoading] = useState(true);
  // State to handle any fetch errors
  const [error, setError] = useState(null);

  // Define the base URL using environment variables for flexibility
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
  console.log("Backend URL (Blog Page):", API_BASE_URL); // Log the URL for debugging

  // Helper function to extract a snippet from the structured content
  const getSnippet = (content) => {
    // Find the first paragraph block
    const firstParagraph = content.find(block => block.type === "paragraph");
    if (firstParagraph) {
      // Truncate the text to a reasonable length for a description
      const text = firstParagraph.data.text;
      return text.length > 150 ? text.substring(0, 150) + "..." : text;
    }
    // Return a default message if no paragraph is found
    return "No description available.";
  };
  
  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Use axios to make the GET request to the blogs endpoint
        const response = await axios.get(`${API_BASE_URL}/blogs`); 
        
        // The data is available in the response.data property with axios
        setBlogPosts(response.data); // Update the state with the fetched blogs
      } catch (e) {
        // Axios error handling is different. The error message is on e.message
        setError(e.message);
      } finally {
        // Set loading to false once the fetch is complete (success or error)
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [API_BASE_URL]); // Added API_BASE_URL to dependencies to re-fetch if it changes

  // Conditional rendering for loading and error states
  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="section-area section-sp1">
          <div className="container">
            <p className="text-center">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content bg-white">
        <div className="section-area section-sp1">
          <div className="container">
            <p className="text-center text-danger">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

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
              {/* Check if there are any posts before mapping */}
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <div
                    className="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40"
                    key={post._id} // Use Mongoose's unique ID for the key
                  >
                    <div className="recent-news">
                      <div className="action-box"></div>
                      <div className="info-bx">
                        <ul className="media-post">
                          <li>
                            <a href="#">
                              <i className="fa fa-calendar"></i>
                              {/* Display the created date from the Mongoose timestamp */}
                              {new Date(post.createdAt).toLocaleDateString()}
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-user"></i>
                              {post.author}
                            </a>
                          </li>
                        </ul>
                        <h5 className="post-title">
                          {/* Link to the blog details page using the unique ID */}
                          <Link to={`/blog-details/${post._id}`}>{post.title}</Link>
                        </h5>
                        {/* Generate a description snippet from the structured content */}
                        <p>{getSnippet(post.content)}</p>
                        <div className="post-extra">
                          {/* Link to the blog details page */}
                          <Link to={`/blog-details/${post._id}`} className="btn-link">
                            READ MORE
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No blog posts found.</p>
                </div>
              )}
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
