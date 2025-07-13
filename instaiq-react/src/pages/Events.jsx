import React, { useState } from "react";

const eventsData = [
  {
    img: "/assets/images/event/1.png",
    type: "happening",
    date: "15",
    month: "July",
    title: "AI in Career Guidance Workshop",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences , and career goals."
  },
  {
    img: "/assets/images/event/2.png",
    type: "upcoming",
    date: "21",
    month: "August",
    title: "Resume Building Bootcamp ",
    time: "11:00am 12:00am",
    location: "Nagpur , India",
    desc: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus  placements,with templates optimized for ATS."
  },
  {
    img: "/assets/images/event/3.png",
    type: "upcoming",
    date: "29",
    month: "August",
    title: "Aptitude Mastery to Succeed in Competitive Exams",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests and competitive exams."
  },
  {
    img: "/assets/images/event/4.png",
    type: "happening",
    date: "9",
    month: "September",
    title: "Job Matching and Placement Portal",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "A portal that matches students with job opportunities based on test scores, skills, and company preferences, integrated with recruiters or platforms like LinkedIn. "
  },
  {
    img: "/assets/images/event/5.png",
    type: "expired",
    date: "2",
    month: "October",
    title: "Interview Preparation",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "Targeted modules to prepare students for technical and HR interviews through mock interviews, question banks, and behavioral tips, focusing on top recruiters’."
  },
  {
    img: "/assets/images/event/6.png",
    type: "happening",
    date: "29",
    month: "October",
    title: "Quiz for Practice",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "A dedicated quiz module offering bite-sized practice questions on aptitude, logical reasoning ,coding and verbal skills, designed to be engaging,time-efficient, and progressively challenging for daily practice."
  }
];

const filterTypes = [
  { label: "All", value: "all" },
  { label: "Happening", value: "happening" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Expired", value: "expired" },
];

const Events = () => {
  const [filter, setFilter] = useState("all");
  const filteredEvents =
    filter === "all"
      ? eventsData
      : eventsData.filter((event) => event.type === filter);

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(/assets/images/banner/banner2.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Events</h1>
          </div>
        </div>
      </div>
      {/* Breadcrumb removed as per user request */}
      {/* Events Section - matches event.html */}
      <div className="content-block">
        <div className="section-area section-sp1 gallery-bx">
          <div className="container">
            {/* Centered filter buttons with homepage style */}
            <div className="feature-filters clearfix m-b40" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ul className="filters" data-toggle="buttons" style={{ display: 'flex', gap: 20 }}>
                {filterTypes.map((type) => (
                  <li
                    key={type.value}
                    data-filter={type.value === "all" ? "" : type.value}
                    className={`btn${filter === type.value ? " active" : ""}`}
                    onClick={() => setFilter(type.value)}
                    style={{ cursor: "pointer", borderRadius: 10, minWidth: 120, minHeight: 40, fontWeight: 600, border: 'none', background: filter === type.value ? '#2563eb' : '#e5e7eb', color: filter === type.value ? '#fff' : '#222', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'inline-block', textAlign: 'center' }}
                  >
                    <input type="radio" checked={filter === type.value} readOnly style={{ display: 'none' }} />
                    <span>{type.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="clearfix">
              <ul id="masonry" className="ttr-gallery-listing magnific-image row" style={{ listStyle: 'none', padding: 0 }}>
                {filteredEvents.map((event, idx) => (
                  <li
                    key={idx}
                    className={`action-card col-lg-4 col-md-6 col-sm-12 ${event.type}`}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
                  >
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 