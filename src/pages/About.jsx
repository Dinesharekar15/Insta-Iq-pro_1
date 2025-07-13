import React from "react";

const About = () => {
  return (
    <div className="page-content bg-white">
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(/assets/images/banner/banner1.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">About Us</h1>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="section-area section-sp1">
            <div className="heading-bx left">
              <h2 className="m-b10 title-head">The Story of INSTA IQ – From Vision to Impact</h2>
            </div>
            <p>
              <strong>The Story</strong> began as a passionate vision in the heart of <em>Amit Aswale</em>, a former defense aspirant turned corporate professional and now a dynamic educator. With firsthand experience of the gap between academic learning and employability skills, Amit recognized a pressing need — students across India were completing degrees without gaining the real-world aptitude, communication, and confidence needed for careers.
            </p>
            <p>
              In 2016, during interactions with college students, Amit noticed a recurring theme: <strong>brilliant minds were underprepared for placements, not due to lack of intelligence, but due to lack of direction, exposure, and soft skill training.</strong> That’s when the seed of INSTA IQ was sown — a platform that would go beyond traditional teaching and focus on <strong>real-time skilling, placement readiness, and confidence building</strong>.
            </p>
            <p>
              With a deep understanding of both <strong>aptitude training</strong> and the <strong>corporate hiring process</strong>, INSTA IQ was launched. Starting with just a few colleges, the brand quickly gained recognition for its <strong>hands-on training modules, industry-relevant curriculum, and outcome-focused delivery</strong>.
            </p>
            <div style={{ margin: "32px 0" }}>
              <h3>What Makes INSTA IQ Different?</h3>
              <ul style={{ fontSize: 18, lineHeight: 1.7 }}>
                <li>Focus on <strong>placement-oriented training</strong> from Semester 1 to Final Year.</li>
                <li>A unique blend of <strong>Quantitative Aptitude, Communication, and Personality Development</strong>.</li>
                <li>Custom modules like:
                  <ul>
                    <li><strong>All India Placement Aptitude Test</strong> – to benchmark students nationwide.</li>
                    <li><strong>Employability Quality Index</strong> – a data-driven approach to assess student readiness.</li>
                    <li><strong>Soft Skills with Simulation</strong> – real-time interview and presentation practice.</li>
                  </ul>
                </li>
                <li><strong>Campus-embedded training model</strong> – delivering transformation right where students are.</li>
              </ul>
            </div>
            <p>
              Today, <strong>INSTA IQ is more than a training company — it's a movement</strong>, helping colleges across India produce not just graduates, but <strong>industry-ready professionals</strong>.
            </p>
            <div style={{ margin: "40px 0 0 0", textAlign: "center" }}>
              <h4>Learn more at <a href="https://www.instaiq.in/aboutus" target="_blank" rel="noopener noreferrer">instaiq.in/aboutus</a></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 