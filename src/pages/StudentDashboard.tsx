import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import RouteMap from '../components/RouteMap';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookedTrips, setShowBookedTrips] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const navigate = useNavigate();

  const [welcomeRef, welcomeVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [searchRef, searchVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, delay: 200 });
  const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, delay: 400 });

  const shuttleRoutes = [
    {
      id: 1,
      busNumber: 'BUS 101',
      duration: '45 min',
      startLocation: 'Main Campus',
      startTime: '08:00 AM',
      endLocation: 'City Center',
      endTime: '08:45 AM',
      stops: 5,
      availableSeats: 12,
      price: 'LKR 50'
    },
    {
      id: 2,
      busNumber: 'BUS 102',
      duration: '30 min',
      startLocation: 'University Gate',
      startTime: '09:00 AM',
      endLocation: 'Library',
      endTime: '09:30 AM',
      stops: 3,
      availableSeats: 8,
      price: 'LKR 30'
    },
    {
      id: 3,
      busNumber: 'BUS 103',
      duration: '60 min',
      startLocation: 'Residence Hall',
      startTime: '10:00 AM',
      endLocation: 'Shopping Mall',
      endTime: '11:00 AM',
      stops: 7,
      availableSeats: 15,
      price: 'LKR 80'
    },
    {
      id: 4,
      busNumber: 'BUS 104',
      duration: '40 min',
      startLocation: 'Sports Complex',
      startTime: '11:00 AM',
      endLocation: 'Cafeteria',
      endTime: '11:40 AM',
      stops: 4,
      availableSeats: 10,
      price: 'LKR 40'
    },
    {
      id: 5,
      busNumber: 'BUS 105',
      duration: '50 min',
      startLocation: 'Lecture Hall',
      startTime: '12:00 PM',
      endLocation: 'Student Center',
      endTime: '12:50 PM',
      stops: 6,
      availableSeats: 18,
      price: 'LKR 60'
    },
    {
      id: 6,
      busNumber: 'BUS 106',
      duration: '35 min',
      startLocation: 'Dormitory',
      startTime: '01:00 PM',
      endLocation: 'Gym',
      endTime: '01:35 PM',
      stops: 3,
      availableSeats: 14,
      price: 'LKR 35'
    }
  ];

  const bookedTrips = [
    {
      id: 1,
      busNumber: 'BUS 101',
      duration: '45 min',
      startLocation: 'Main Campus',
      startTime: '08:00 AM',
      endLocation: 'City Center',
      endTime: '08:45 AM',
      bookingDate: '2026-02-16',
      seatNumber: 'A5',
      status: 'Confirmed',
      route: [
        [6.9271, 79.8612], // Colombo
        [6.9147, 79.9725], // Rajagiriya
        [6.9000, 79.9580], // Nugegoda
        [6.8650, 79.8997], // Moratuwa
      ]
    },
    {
      id: 2,
      busNumber: 'BUS 102',
      duration: '30 min',
      startLocation: 'University Gate',
      startTime: '09:00 AM',
      endLocation: 'Library',
      endTime: '09:30 AM',
      bookingDate: '2026-02-16',
      seatNumber: 'B3',
      status: 'Confirmed',
      route: [
        [6.9147, 79.9725], // Rajagiriya
        [6.9000, 79.9580], // Nugegoda
      ]
    },
    {
      id: 3,
      busNumber: 'BUS 103',
      duration: '60 min',
      startLocation: 'Residence Hall',
      startTime: '10:00 AM',
      endLocation: 'Shopping Mall',
      endTime: '11:00 AM',
      bookingDate: '2026-02-15',
      seatNumber: 'C7',
      status: 'Completed',
      route: [
        [6.9000, 79.9580], // Nugegoda
        [6.8650, 79.8997], // Moratuwa
        [6.9271, 79.8612], // Colombo
      ]
    }
  ];

  const handleBookedTripsClick = () => {
    setShowBookedTrips(true);
  };

  const handleBackToRoutes = () => {
    setShowBookedTrips(false);
  };

  const handleViewRoute = (trip: any) => {
    setSelectedRoute(trip);
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
    setSelectedRoute(null);
  };

  return (
    <div>
      <div className="dashboard-wrapper">
        {/* Welcome Header */}
        <div ref={welcomeRef} className={`dashboard-welcome fade-up ${welcomeVisible ? 'visible' : ''}`}>
          <h1>Welcome, Student!</h1>
          <p>Find and book your shuttle rides easily</p>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className={`search-container fade-up ${searchVisible ? 'visible' : ''}`}>
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search for shuttle routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Statistics Cards */}
        <div ref={statsRef} className={`stats-grid fade-up ${statsVisible ? 'visible' : ''}`}>
          <div className="stat-card" onClick={handleBackToRoutes} style={{ cursor: 'pointer' }}>
            <div className="stat-icon">
              <i className="fas fa-bus"></i>
            </div>
            <div className="stat-info">
              <h3>{shuttleRoutes.length}</h3>
              <p>Available Buses</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-route"></i>
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Active Routes</p>
            </div>
          </div>

          <div className="stat-card" onClick={handleBookedTripsClick} style={{ cursor: 'pointer' }}>
            <div className="stat-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <div className="stat-info">
              <h3>8</h3>
              <p>Booked Trips</p>
            </div>
          </div>
        </div>

        {/* Available Shuttle Routes or Booked Trips */}
        <div className="routes-section">
          {showBookedTrips ? (
            <>
              <div className="section-header">
                <h2 className="section-title">My Booked Trips</h2>
              </div>

              <div className="routes-list">
                {bookedTrips.map((trip) => (
                  <div key={trip.id} className="route-card booked-trip">
                    <div className="route-header">
                      <div className="bus-number">
                        <i className="fas fa-bus-alt"></i>
                        <span>{trip.busNumber}</span>
                      </div>
                      <div className="trip-status">
                        <span className={`status-badge ${trip.status.toLowerCase()}`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>

                    <div className="route-details">
                      <div className="route-location">
                        <div className="location-point start">
                          <i className="fas fa-circle"></i>
                          <div className="location-info">
                            <p className="location-name">{trip.startLocation}</p>
                            <p className="location-time">{trip.startTime}</p>
                          </div>
                        </div>

                        <div className="route-line">
                          <div className="route-dots"></div>
                        </div>

                        <div className="location-point end">
                          <i className="fas fa-map-marker-alt"></i>
                          <div className="location-info">
                            <p className="location-name">{trip.endLocation}</p>
                            <p className="location-time">{trip.endTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="route-footer">
                      <div className="route-meta">
                        <span className="meta-item">
                          <i className="fas fa-calendar"></i>
                          {trip.bookingDate}
                        </span>
                        <span className="meta-item">
                          <i className="fas fa-chair"></i>
                          Seat {trip.seatNumber}
                        </span>
                        <span className="route-price">{trip.duration}</span>
                      </div>
                      <button className="view-route-btn" onClick={() => handleViewRoute(trip)}>
                        <i className="fas fa-map"></i> View Route
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="section-title">Available Shuttle Routes</h2>

              <div className="routes-list">
                {shuttleRoutes.map((route) => (
                  <div key={route.id} className="route-card">
                    <div className="route-header">
                      <div className="bus-number">
                        <i className="fas fa-bus-alt"></i>
                        <span>{route.busNumber}</span>
                      </div>
                      <div className="route-duration">
                        <i className="far fa-clock"></i>
                        <span>{route.duration}</span>
                      </div>
                    </div>

                    <div className="route-details">
                      <div className="route-location">
                        <div className="location-point start">
                          <i className="fas fa-circle"></i>
                          <div className="location-info">
                            <p className="location-name">{route.startLocation}</p>
                            <p className="location-time">{route.startTime}</p>
                          </div>
                        </div>

                        <div className="route-line">
                          <div className="route-dots"></div>
                        </div>

                        <div className="location-point end">
                          <i className="fas fa-map-marker-alt"></i>
                          <div className="location-info">
                            <p className="location-name">{route.endLocation}</p>
                            <p className="location-time">{route.endTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="route-footer">
                      <div className="route-meta">
                        <span className="meta-item">
                          <i className="fas fa-map-pin"></i>
                          {route.stops} Stops
                        </span>
                        <span className="meta-item">
                          <i className="fas fa-chair"></i>
                          {route.availableSeats} Seats
                        </span>
                        <span className="route-price">{route.price}</span>
                      </div>
                      <button className="book-btn" onClick={() => navigate('/shuttle-booking', { state: { shuttle: route } })}>
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Map Modal */}
        {showMapModal && selectedRoute && (
          <div className="map-modal-overlay" onClick={closeMapModal}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
              <div className="map-modal-header">
                <h3>Route Map - {selectedRoute.busNumber}</h3>
                <button className="close-modal-btn" onClick={closeMapModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="map-modal-body">
                <div className="route-info">
                  <div className="route-detail">
                    <i className="fas fa-circle"></i>
                    <span>{selectedRoute.startLocation} ({selectedRoute.startTime})</span>
                  </div>
                  <div className="route-arrow">
                    <i className="fas fa-arrow-down"></i>
                  </div>
                  <div className="route-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{selectedRoute.endLocation} ({selectedRoute.endTime})</span>
                  </div>
                </div>
                <div className="map-container">
                  <RouteMap route={selectedRoute.route} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
