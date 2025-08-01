import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Events Page):", import.meta.env.VITE_BACKEND_URL);

// Filter types for events
const filterTypes = [
  { label: "All", value: "all" },
  { label: "Happening", value: "happening" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Expired", value: "expired" },
];

const Events = () => {
  const [allFetchedEvents, setAllFetchedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch from the public events endpoint
        const response = await axios.get(`${API_BASE_URL}/events`);
        setAllFetchedEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err.response ? err.response.data : err.message);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  // Filter events by type
  const filteredEvents =
    filter === "all"
      ? allFetchedEvents
      : allFetchedEvents.filter((event) => event.type === filter);

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
      {/* Events Section */}
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
              {loading ? (
                <div className="col-12 text-center text-muted">Loading events...</div>
              ) : error ? (
                <div className="col-12 text-center text-danger">{error}</div>
              ) : filteredEvents.length === 0 ? (
                <div className="col-12 text-center text-muted">No events found matching your criteria.</div>
              ) : (
                <ul id="masonry" className="ttr-gallery-listing magnific-image row" style={{ listStyle: 'none', padding: 0 }}>
                  {filteredEvents.map((event) => (
                    <li
                      key={event._id}
                      className={`action-card col-lg-4 col-md-6 col-sm-12 ${event.type}`}
                      style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
                    >
                      <div className="event-bx d-flex flex-column h-100" style={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffe6b3', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', width: '100%' }}>
                        <div className="action-box" style={{ position: 'relative' }}>
                          <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: 150, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'block' }} />
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
