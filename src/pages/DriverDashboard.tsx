/// <reference types="styled-jsx" />

import React, { useState } from 'react';
import RouteMap from '../components/RouteMap';

interface Seat {
  id: number;
  occupied: boolean;
  passengerName?: string;
  parentPhone?: string;
  studentId?: string;
  pickupLocation?: string;
}

const DriverDashboard = () => {
  // Mock data - in real app this would come from API/database
  const [busRoute] = useState({
    busNumber: 'BUS 101'
  });

  // Mock occupied seats data
  const [seats] = useState<Seat[]>([
    { id: 1, occupied: true, passengerName: 'John Doe', parentPhone: '+94 77 123 4567', studentId: 'STU001', pickupLocation: 'Rajagiriya' },
    { id: 2, occupied: false },
    { id: 3, occupied: true, passengerName: 'Jane Smith', parentPhone: '+94 77 234 5678', studentId: 'STU002', pickupLocation: 'Nugegoda' },
    { id: 4, occupied: false },
    { id: 5, occupied: true, passengerName: 'Bob Wilson', parentPhone: '+94 77 345 6789', studentId: 'STU003', pickupLocation: 'Moratuwa' },
    { id: 6, occupied: false },
    { id: 7, occupied: false },
    { id: 8, occupied: true, passengerName: 'Alice Brown', parentPhone: '+94 77 456 7890', studentId: 'STU004', pickupLocation: 'Dehiwala' },
    { id: 9, occupied: false },
    { id: 10, occupied: false },
    { id: 11, occupied: true, passengerName: 'Charlie Davis', parentPhone: '+94 77 567 8901', studentId: 'STU005', pickupLocation: 'Rajagiriya' },
    { id: 12, occupied: false },
    { id: 13, occupied: false },
    { id: 14, occupied: false },
    { id: 15, occupied: true, passengerName: 'Eva Garcia', parentPhone: '+94 77 678 9012', studentId: 'STU006', pickupLocation: 'Nugegoda' },
    { id: 16, occupied: false }
  ]);

  const occupiedSeats = seats.filter(seat => seat.occupied).length;
  const totalSeats = seats.length;

  // Modal state
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);

  // SOS and Bus Status state
  const [showSOSDropdown, setShowSOSDropdown] = useState(false);
  const [selectedEmergencyReason, setSelectedEmergencyReason] = useState<string>('');
  const [busAvailable, setBusAvailable] = useState(true);

  // Route Form state
  const [routeForm, setRouteForm] = useState({
    startTime: '',
    endTime: '',
    startRoute: '',
    endRoute: ''
  });

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
    setShowSeatModal(true);
  };

  const closeSeatModal = () => {
    setShowSeatModal(false);
    setSelectedSeat(null);
  };

  const handleSOSClick = () => {
    setShowSOSDropdown(!showSOSDropdown);
  };

  const handleEmergencyReasonSelect = (reason: string) => {
    setSelectedEmergencyReason(reason);
  };

  const handleReportEmergency = () => {
    // In a real app, this would send the emergency report to the server
    alert(`Emergency reported: ${selectedEmergencyReason}\nBus: BUS 101\nLocation: Nugegoda\nTime: ${new Date().toLocaleTimeString()}`);
    setShowSOSDropdown(false);
    setSelectedEmergencyReason('');
  };

  const toggleBusStatus = () => {
    setBusAvailable(!busAvailable);
  };

  const handleRouteFormChange = (field: string, value: string) => {
    setRouteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRouteFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the route to the database
    alert(`Route updated successfully!\nStart Time: ${routeForm.startTime}\nEnd Time: ${routeForm.endTime}\nStart Route: ${routeForm.startRoute}\nEnd Route: ${routeForm.endRoute}`);
  };

  const renderSeat = (seat: Seat) => (
    <div
      key={seat.id}
      className={`seat ${seat.occupied ? 'occupied' : 'available'}`}
      title={seat.occupied ? `Click to view ${seat.passengerName}'s details` : 'Available seat'}
      onClick={() => handleSeatClick(seat)}
      style={{ cursor: seat.occupied ? 'pointer' : 'default' }}
    >
      {seat.id}
    </div>
  );

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🚐 Driver Dashboard</h1>
          <div className="bus-info">
            <h2>{busRoute.busNumber}</h2>
          </div>
        </div>
        <div className="header-actions">
          <button
            className={`bus-status-btn ${busAvailable ? 'available' : 'unavailable'}`}
            onClick={toggleBusStatus}
          >
            {busAvailable ? '🟢 Available' : '🔴 Not Available'}
          </button>
          <div className="sos-container">
            <button
              className="sos-btn"
              onClick={handleSOSClick}
            >
              🚨 SOS
            </button>
            {showSOSDropdown && (
              <div className="sos-dropdown">
                <h4>Select Emergency Type:</h4>
                <div className="emergency-options">
                  <button
                    className={`emergency-option ${selectedEmergencyReason === 'tire_punch' ? 'selected' : ''}`}
                    onClick={() => handleEmergencyReasonSelect('tire_punch')}
                  >
                    🛞 Tire Punch
                  </button>
                  <button
                    className={`emergency-option ${selectedEmergencyReason === 'engine_issue' ? 'selected' : ''}`}
                    onClick={() => handleEmergencyReasonSelect('engine_issue')}
                  >
                    ⚙️ Engine Issue
                  </button>
                  <button
                    className={`emergency-option ${selectedEmergencyReason === 'medical' ? 'selected' : ''}`}
                    onClick={() => handleEmergencyReasonSelect('medical')}
                  >
                    🚑 Medical Emergency
                  </button>
                  <button
                    className={`emergency-option ${selectedEmergencyReason === 'accident' ? 'selected' : ''}`}
                    onClick={() => handleEmergencyReasonSelect('accident')}
                  >
                    💥 Accident
                  </button>
                  <button
                    className={`emergency-option ${selectedEmergencyReason === 'other' ? 'selected' : ''}`}
                    onClick={() => handleEmergencyReasonSelect('other')}
                  >
                    ⚠️ Other Emergency
                  </button>
                </div>
                {selectedEmergencyReason && (
                  <button
                    className="report-emergency-btn"
                    onClick={handleReportEmergency}
                  >
                    📞 Report Emergency
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="status-badge">
            <span className="live-indicator">🔴</span>
            LIVE TRACKING
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Panel - Route Management, Bus Status & Seats */}
        <div className="left-panel">
          {/* Route Form Card */}
          <div className="route-form-card">
            <h3>🛣️ Route Management</h3>
            <form className="route-form" onSubmit={handleRouteFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startTime">
                    <i className="fas fa-clock"></i> Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={routeForm.startTime}
                    onChange={(e) => handleRouteFormChange('startTime', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endTime">
                    <i className="fas fa-clock"></i> End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={routeForm.endTime}
                    onChange={(e) => handleRouteFormChange('endTime', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startRoute">
                    <i className="fas fa-map-marker-alt"></i> Start Route
                  </label>
                  <select
                    id="startRoute"
                    value={routeForm.startRoute}
                    onChange={(e) => handleRouteFormChange('startRoute', e.target.value)}
                    required
                  >
                    <option value="">Select start location</option>
                    <option value="campus">🏫 University Campus</option>
                    <option value="rajagiriya">🏘️ Rajagiriya</option>
                    <option value="nugegoda">🏘️ Nugegoda</option>
                    <option value="dehiwala">🏘️ Dehiwala</option>
                    <option value="moratuwa">🏘️ Moratuwa</option>
                    <option value="colombo">🏙️ Colombo City</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="endRoute">
                    <i className="fas fa-flag-checkered"></i> End Route
                  </label>
                  <select
                    id="endRoute"
                    value={routeForm.endRoute}
                    onChange={(e) => handleRouteFormChange('endRoute', e.target.value)}
                    required
                  >
                    <option value="">Select end location</option>
                    <option value="campus">🏫 University Campus</option>
                    <option value="rajagiriya">🏘️ Rajagiriya</option>
                    <option value="nugegoda">🏘️ Nugegoda</option>
                    <option value="dehiwala">🏘️ Dehiwala</option>
                    <option value="moratuwa">🏘️ Moratuwa</option>
                    <option value="colombo">🏙️ Colombo City</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="update-route-btn">
                <i className="fas fa-save"></i> Update Route
              </button>
            </form>
          </div>

          {/* Bus Status Card */}
          <div className="status-card">
            <h3>📍 Bus Status</h3>
            <div className="status-info">
              <div className="status-item">
                <span className="label">Occupied Seats:</span>
                <span className="value">{occupiedSeats}/{totalSeats}</span>
              </div>
              <div className="status-item">
                <span className="label">Available Seats:</span>
                <span className="value">{totalSeats - occupiedSeats}</span>
              </div>
            </div>
          </div>

          {/* Seat Layout Card */}
          <div className="seat-card">
            <h3>💺 Seat Layout</h3>
            <div className="bus-seats">
              {/* Front of bus */}
              <div className="bus-front">🚍 Front</div>

              {/* Seats in 4x4 grid */}
              <div className="seats-grid">
                {seats.slice(0, 4).map(renderSeat)}
              </div>
              <div className="seats-grid">
                {seats.slice(4, 8).map(renderSeat)}
              </div>
              <div className="seats-grid">
                {seats.slice(8, 12).map(renderSeat)}
              </div>
              <div className="seats-grid">
                {seats.slice(12, 16).map(renderSeat)}
              </div>
            </div>

            {/* Seat Legend */}
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat occupied"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="right-panel">
          <div className="route-card">
            <h3>🗺️ Live Route Map</h3>

            {/* Route Map */}
            <RouteMap
              route={[
                [6.9271, 79.8612], // Colombo
                [6.9147, 79.9725], // Rajagiriya
                [6.9000, 79.9580], // Nugegoda
                [6.8650, 79.8997], // Moratuwa
              ]}
              shuttlePosition={[6.9147, 79.9725]}
              currentStop={1}
              isTracking={true}
            />
          </div>
        </div>
      </div>

      {/* Seat Details Modal */}
      {showSeatModal && selectedSeat && (
        <div className="seat-modal-overlay" onClick={closeSeatModal}>
          <div className="seat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👤 Seat {selectedSeat.id} Details</h3>
              <button className="close-btn" onClick={closeSeatModal}>×</button>
            </div>

            <div className="modal-content">
              {selectedSeat.occupied ? (
                <div className="passenger-details">
                  <div className="detail-item">
                    <span className="label">👨‍🎓 Student Name:</span>
                    <span className="value">{selectedSeat.passengerName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">📱 Parent Phone:</span>
                    <span className="value">{selectedSeat.parentPhone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">🆔 Student ID:</span>
                    <span className="value">{selectedSeat.studentId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">📍 Pickup Location:</span>
                    <span className="value">{selectedSeat.pickupLocation}</span>
                  </div>
                  <div className="contact-actions">
                    <button
                      className="call-btn"
                      onClick={() => window.open(`tel:${selectedSeat.parentPhone}`, '_blank')}
                    >
                      📞 Call Parent
                    </button>
                    <button
                      className="message-btn"
                      onClick={() => window.open(`sms:${selectedSeat.parentPhone}`, '_blank')}
                    >
                      💬 Send Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-seat">
                  <div className="empty-icon">🪑</div>
                  <p>This seat is currently available</p>
                  <span className="empty-note">No passenger assigned</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .driver-dashboard {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
          padding-top: 100px; /* Account for fixed navbar */
        }

        .dashboard-header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1000;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          z-index: 1000;
        }

        .bus-status-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bus-status-btn.available {
          background: #4CAF50;
          color: white;
        }

        .bus-status-btn.available:hover {
          background: #388E3C;
          transform: translateY(-1px);
        }

        .bus-status-btn.unavailable {
          background: #f44336;
          color: white;
        }

        .bus-status-btn.unavailable:hover {
          background: #d32f2f;
          transform: translateY(-1px);
        }

        .sos-container {
          position: relative;
          z-index: 1500;
        }

        .sos-btn {
          background: #ff4444;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
          animation: pulse-sos 2s infinite;
        }

        .sos-btn:hover {
          background: #cc0000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
        }

        @keyframes pulse-sos {
          0%, 100% { box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3); }
          50% { box-shadow: 0 4px 20px rgba(255, 68, 68, 0.5); }
        }

        .sos-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 15px;
          padding: 20px;
          min-width: 250px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2000;
          margin-top: 10px;
        }

        .sos-dropdown h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
        }

        .emergency-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 15px;
        }

        .emergency-option {
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .emergency-option:hover {
          border-color: var(--primary);
          background: rgba(132, 23, 186, 0.05);
        }

        .emergency-option.selected {
          border-color: var(--primary);
          background: rgba(132, 23, 186, 0.1);
          color: var(--primary);
          font-weight: 600;
        }

        .report-emergency-btn {
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
        }

        .report-emergency-btn:hover {
          background: linear-gradient(135deg, #cc0000 0%, #aa0000 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
        }

        .header-content h1 {
          margin: 0 0 10px 0;
          font-size: 2.2rem;
          font-weight: 700;
        }

        .bus-info h2 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .bus-info p {
          margin: 5px 0 0 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .live-indicator {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .left-panel, .right-panel {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .status-card, .seat-card, .route-card, .route-form-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .status-card h3, .seat-card h3, .route-card h3, .route-form-card h3 {
          margin: 0 0 20px 0;
          color: var(--primary);
          font-size: 1.4rem;
          font-weight: 600;
        }

        .status-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .status-item:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 500;
          color: #666;
        }

        .value {
          font-weight: 600;
          color: var(--primary);
        }

        .bus-seats {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .bus-front {
          background: #333;
          color: white;
          padding: 12px 25px;
          border-radius: 8px;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .seats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: 100%;
          max-width: 220px;
        }

        .seat {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .seat.available {
          background: #4CAF50;
          color: white;
        }

        .seat.available:hover {
          background: #388E3C;
          transform: scale(1.05);
        }

        .seat.occupied {
          background: #f44336;
          color: white;
          opacity: 0.8;
        }

        .seat-legend {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .legend-item .seat {
          width: 20px;
          height: 20px;
          cursor: default;
        }

        .legend-item .seat:hover {
          transform: none;
        }

        .route-stops h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1.1rem;
        }

        .stops-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stop-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          border-radius: 8px;
          background: #f8f9fa;
          transition: all 0.2s;
        }

        .stop-item.current {
          background: rgba(132, 23, 186, 0.1);
          border: 1px solid var(--primary);
        }

        .stop-item.completed {
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid #4CAF50;
        }

        .stop-marker {
          font-size: 1.2rem;
        }

        .stop-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stop-name {
          font-weight: 600;
          color: #333;
        }

        .stop-status {
          font-size: 0.8rem;
          color: #666;
        }

        .map-placeholder {
          margin-top: 30px;
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .map-header h4 {
          margin: 0;
          color: #333;
        }

        .map-status {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        .map-content {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 10px;
          padding: 20px;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .map-visualization {
          position: relative;
          width: 100%;
          height: 120px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          border: 2px solid rgba(132, 23, 186, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .route-line {
          position: absolute;
          top: 50%;
          left: 10%;
          right: 10%;
          height: 4px;
          background: linear-gradient(90deg, #4CAF50 0%, var(--primary) 50%, #9E9E9E 100%);
          border-radius: 2px;
          transform: translateY(-50%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .route-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            #4CAF50 0%, #4CAF50 30%,
            var(--primary) 30%, var(--primary) 60%,
            #9E9E9E 60%, #9E9E9E 100%);
          border-radius: 2px;
          animation: routeFlow 2s ease-in-out infinite;
        }

        @keyframes routeFlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        }

        .map-points-display {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .map-section-title {
          text-align: center;
          margin-bottom: 15px;
        }

        .map-section-title h4 {
          margin: 0;
          color: var(--primary);
          font-size: 1.1rem;
          font-weight: 700;
        }

        .map-points-row {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 20px;
          max-width: 300px;
          margin: 0 auto;
        }

        .map-point-btn {
          flex: 0 0 auto;
          width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 15px 10px;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(132, 23, 186, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .map-point-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-color: var(--primary);
        }

        .point-icon {
          font-size: 1.5rem;
        }

        .point-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
        }

        /* Route Form Styles */
        .route-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 15px;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #555;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-group input,
        .form-group select {
          padding: 12px 15px;
          border: 2px solid rgba(132, 23, 186, 0.2);
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          background: white;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(132, 23, 186, 0.1);
        }

        .update-route-btn {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }

        .update-route-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(132, 23, 186, 0.3);
        }

        .update-route-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .dashboard-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 25px;
          }

          .header-actions {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }

          .bus-status-btn {
            width: 100%;
            justify-content: center;
          }

          .sos-container {
            width: 100%;
          }

          .sos-btn {
            width: 100%;
          }

          .sos-dropdown {
            position: static;
            margin-top: 10px;
            width: 100%;
            min-width: unset;
          }

          .form-row {
            flex-direction: column;
            gap: 15px;
          }

          .update-route-btn {
            width: 100%;
          }

          .header-content h1 {
            font-size: 2rem;
          }

          .status-card, .seat-card, .route-card, .route-form-card {
            padding: 20px;
          }

          .seats-grid {
            max-width: 200px;
          }

          .seat {
            width: 35px;
            height: 35px;
            cursor: default;
          }
        }

        /* Seat Modal Styles */
        .seat-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease-out;
        }

        .seat-modal {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 0;
          max-width: 400px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 25px 15px 25px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .modal-header h3 {
          margin: 0;
          color: var(--primary);
          font-size: 1.4rem;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 28px;
          color: #666;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #333;
        }

        .modal-content {
          padding: 25px;
        }

        .passenger-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 15px;
          background: rgba(132, 23, 186, 0.05);
          border-radius: 10px;
          border-left: 4px solid var(--primary);
        }

        .detail-item .label {
          font-weight: 600;
          color: #555;
          font-size: 0.9rem;
        }

        .detail-item .value {
          font-weight: 500;
          color: #333;
          font-size: 1rem;
          word-break: break-word;
        }

        .contact-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .call-btn, .message-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .call-btn {
          background: #4CAF50;
          color: white;
        }

        .call-btn:hover {
          background: #388E3C;
          transform: translateY(-1px);
        }

        .message-btn {
          background: #2196F3;
          color: white;
        }

        .message-btn:hover {
          background: #1976D2;
          transform: translateY(-1px);
        }

        .empty-seat {
          text-align: center;
          padding: 30px 20px;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          opacity: 0.6;
        }

        .empty-seat p {
          margin: 0 0 10px 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: #666;
        }

        .empty-note {
          color: #999;
          font-size: 0.9rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 480px) {
          .seat-modal {
            width: 95%;
            margin: 20px;
          }

          .modal-header, .modal-content {
            padding: 20px;
          }

          .contact-actions {
            flex-direction: column;
          }

          .call-btn, .message-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DriverDashboard;