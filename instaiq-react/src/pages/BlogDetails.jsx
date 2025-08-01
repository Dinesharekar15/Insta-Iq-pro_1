import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// This component fetches a single blog post by ID and renders its full content.
const BlogDetails = () => {
  // Use useParams to get the blog post ID from the URL
  const { id } = useParams();

  // State to store the fetched blog post data
  const [blogPost, setBlogPost] = useState(null);
  // State to handle the loading status
  const [loading, setLoading] = useState(true);
  // State to handle any fetch errors
  const [error, setError] = useState(null);
  
  // Define the base URL using environment variables for flexibility
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

  // Use useEffect to fetch the blog post data when the component mounts or the ID changes
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Construct the full API URL with the blog post ID
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        setBlogPost(response.data);
      } catch (e) {
        // Handle cases where the blog post is not found or other errors occur
        setError(`Failed to fetch blog post: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id, API_BASE_URL]); // The effect re-runs if the ID or base URL changes

  // Helper function to render each content block based on its type
  const renderContent = (content) => {
    if (!content || !Array.isArray(content)) {
      return <p>No content to display.</p>;
    }

    return content.map((block, index) => {
      // Use the block type to determine which HTML element to render
      switch (block.type) {
        case "heading":
          const HeadingTag = `h${block.data.level}`;
          return <HeadingTag key={index}>{block.data.text}</HeadingTag>;
        case "paragraph":
          return <p key={index}>{block.data.text}</p>;
        case "list":
          return (
            <ul key={index}>
              {block.data.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        case "image":
          return (
            <div key={index} className="blog-image">
              <img src={block.data.url} alt={block.data.caption} />
              {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
            </div>
          );
        case "quote":
          return (
            <blockquote key={index}>
              <p>{block.data.text}</p>
              {block.data.author && <footer>— {block.data.author}</footer>}
            </blockquote>
          );
        case "code":
          return (
            <pre key={index}>
              <code className={`language-${block.data.language || 'plaintext'}`}>
                {block.data.code}
              </code>
            </pre>
          );
        default:
          return null; // Return nothing for unrecognized block types
      }
    });
  };

  // Conditional rendering for loading, error, and not-found states
  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="section-area section-sp1">
          <div className="container">
            <p className="text-center">Loading blog post...</p>
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
  
  if (!blogPost) {
    return (
      <div className="page-content bg-white">
        <div className="section-area section-sp1">
          <div className="container">
            <p className="text-center">Blog post not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content bg-white">
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner1.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{blogPost.title}</h1>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="blog-single-head">
              <ul className="media-post">
                <li><span><i className="fa fa-calendar"></i>{new Date(blogPost.createdAt).toLocaleDateString()}</span></li>
                <li><span><i className="fa fa-user"></i>{blogPost.author}</span></li>
              </ul>
              <h2 className="post-title">{blogPost.title}</h2>
            </div>
            <div className="blog-single-content">
              {/* Render the full content using the helper function */}
              {renderContent(blogPost.content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
