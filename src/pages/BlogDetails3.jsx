import React from "react";
import { Link } from "react-router-dom";

const BlogDetails3 = () => (
  <div className="page-content bg-white">
    <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner1.jpg)" }}>
      <div className="container">
        <div className="page-banner-entry">
          <h1 className="text-white">Capgemini Recruitment Process</h1>
        </div>
      </div>
    </div>
    <div className="content-block">
      <div className="section-area section-sp1">
        <div className="container">
          <div className="blog-single-head">
            <ul className="media-post">
              <li><span><i className="fa fa-calendar"></i>May 31, 2024</span></li>
              <li><span><i className="fa fa-user"></i>Amit Aswale</span></li>
            </ul>
            <h2 className="post-title">Capgemini Recruitment Process Overview</h2>
          </div>
          <div className="blog-single-content">
            <p>Capgemini, a global leader in consulting and technology services, follows a structured and multi-stage recruitment process designed to assess both technical and behavioral competencies.</p>
            <h4>1. Online Assessment:</h4>
            <p>This round includes sections such as:</p>
            <ul>
              <li>Quantitative Aptitude</li>
              <li>Logical Reasoning</li>
              <li>English Communication</li>
              <li>Pseudo-code (basic programming logic)</li>
              <li>Game-Based Aptitude (newly introduced)</li>
            </ul>
            <h4>2. Technical Interview:</h4>
            <p>This round tests knowledge in programming languages, data structures, OOP concepts, and real-world problem-solving capabilities. Projects mentioned in resumes are also discussed in detail.</p>
            <h4>3. HR Interview:</h4>
            <p>It focuses on your communication skills, confidence, motivation, willingness to relocate, career goals, and cultural fit.</p>
            <h4>Eligibility Criteria:</h4>
            <ul>
              <li>Minimum 60% in 10th, 12th, and graduation.</li>
              <li>No current backlogs.</li>
              <li>Gap of not more than 1 year in education.</li>
            </ul>
            <h4>Tips for Students:</h4>
            <ul>
              <li>Focus on problem-solving and basic coding practice.</li>
              <li>Strengthen verbal ability and logic-based reasoning.</li>
              <li>Practice with game-based aptitude mock tests.</li>
            </ul>
            <p>At INSTA iQ, we offer complete placement readiness programs tailored to help students ace companies like Capgemini.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetails3; 