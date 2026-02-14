import React, { useState } from 'react';

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalTrips: number;
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  seats: number;
  joinDate: string;
  rating: number;
}

interface Student {
  id: number;
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  university: string;
  homeAddress: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  totalBookings: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface EmergencyReport {
  id: number;
  driverName: string;
  busNumber: string;
  emergencyType: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'in_progress';
}

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'drivers' | 'students' | 'emergencies' | 'analytics'>('overview');
  const [passwordVisibility, setPasswordVisibility] = useState<{[key: number]: boolean}>({});
  const [driverPasswordVisibility, setDriverPasswordVisibility] = useState<{[key: number]: boolean}>({});
  const [driverSearchTerm, setDriverSearchTerm] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');

  const togglePasswordVisibility = (studentId: number) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const toggleDriverPasswordVisibility = (driverId: number) => {
    setDriverPasswordVisibility(prev => ({
      ...prev,
      [driverId]: !prev[driverId]
    }));
  };

  // Mock data - in real app this would come from API
  const [drivers] = useState<Driver[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@shuttle.com',
      phone: '+94 77 123 4567',
      status: 'active',
      totalTrips: 145,
      licenseNumber: 'DL123456789',
      vehicleType: 'Bus',
      vehicleNumber: 'BUS 101',
      seats: 45,
      joinDate: '2023-08-15',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@shuttle.com',
      phone: '+94 77 234 5678',
      status: 'active',
      totalTrips: 132,
      licenseNumber: 'DL987654321',
      vehicleType: 'Minibus',
      vehicleNumber: 'BUS 102',
      seats: 25,
      joinDate: '2023-09-20',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@shuttle.com',
      phone: '+94 77 345 6789',
      status: 'inactive',
      totalTrips: 98,
      licenseNumber: 'DL456789123',
      vehicleType: 'Bus',
      vehicleNumber: 'BUS 103',
      seats: 50,
      joinDate: '2023-07-10',
      rating: 4.6
    },
  ]);

  const [students] = useState<Student[]>([
    {
      id: 1,
      username: 'alexchen',
      fullName: 'Alex Chen',
      email: 'alex@student.edu',
      mobile: '+94 77 456 7890',
      university: 'University of Colombo',
      homeAddress: '123 Main Street, Colombo',
      parentName: 'Mr. Chen',
      parentEmail: 'parent.chen@email.com',
      parentPhone: '+94 77 456 7890',
      totalBookings: 23,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      username: 'emmawilson',
      fullName: 'Emma Wilson',
      email: 'emma@student.edu',
      mobile: '+94 77 567 8901',
      university: 'University of Peradeniya',
      homeAddress: '456 Oak Avenue, Kandy',
      parentName: 'Mrs. Wilson',
      parentEmail: 'parent.wilson@email.com',
      parentPhone: '+94 77 567 8901',
      totalBookings: 31,
      status: 'active',
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      username: 'ryanbrown',
      fullName: 'Ryan Brown',
      email: 'ryan@student.edu',
      mobile: '+94 77 678 9012',
      university: 'University of Moratuwa',
      homeAddress: '789 Pine Road, Moratuwa',
      parentName: 'Mr. Brown',
      parentEmail: 'parent.brown@email.com',
      parentPhone: '+94 77 678 9012',
      totalBookings: 18,
      status: 'active',
      joinDate: '2023-12-10'
    },
  ]);

  const [emergencies] = useState<EmergencyReport[]>([
    { id: 1, driverName: 'John Smith', busNumber: 'BUS 101', emergencyType: 'Tire Punch', location: 'Nugegoda', timestamp: '2024-02-14 10:30 AM', status: 'resolved' },
    { id: 2, driverName: 'Sarah Johnson', busNumber: 'BUS 102', emergencyType: 'Medical Emergency', location: 'Rajagiriya', timestamp: '2024-02-14 11:15 AM', status: 'in_progress' },
    { id: 3, driverName: 'Mike Davis', busNumber: 'BUS 103', emergencyType: 'Engine Issue', location: 'Moratuwa', timestamp: '2024-02-14 09:45 AM', status: 'pending' },
  ]);

  const stats = {
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'active').length,
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    totalBookings: students.reduce((sum, s) => sum + s.totalBookings, 0),
    pendingEmergencies: emergencies.filter(e => e.status === 'pending').length,
    resolvedEmergencies: emergencies.filter(e => e.status === 'resolved').length,
  };

  // Filter drivers based on search term
  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(driverSearchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(driverSearchTerm.toLowerCase()) ||
    driver.phone.includes(driverSearchTerm) ||
    driver.vehicleNumber.toLowerCase().includes(driverSearchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(driverSearchTerm.toLowerCase())
  );

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.username.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.mobile.includes(studentSearchTerm) ||
    student.university.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalDrivers}</h3>
            <p>Total Drivers</p>
            <span className="stat-badge">{stats.activeDrivers} active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
            <span className="stat-badge">{stats.activeStudents} active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
            <span className="stat-badge">This month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <h3>{stats.pendingEmergencies}</h3>
            <p>Pending Emergencies</p>
            <span className="stat-badge">{stats.resolvedEmergencies} resolved</span>
          </div>
        </div>
      </div>

      <div className="recent-emergencies">
        <h2>Recent Emergency Reports</h2>
        <div className="emergency-cards">
          {emergencies.slice(0, 3).map(emergency => (
            <div key={emergency.id} className="emergency-card">
              <div className="emergency-header">
                <span className="emergency-type">{emergency.emergencyType}</span>
                <span className={`status ${emergency.status}`}>{emergency.status}</span>
              </div>
              <div className="emergency-details">
                <p><strong>Driver:</strong> {emergency.driverName}</p>
                <p><strong>Bus:</strong> {emergency.busNumber}</p>
                <p><strong>Location:</strong> {emergency.location}</p>
                <p><strong>Time:</strong> {emergency.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div className="drivers-content">
      <div className="content-header">
        <h2>Driver Management</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search drivers by name, email, phone, vehicle..."
            value={driverSearchTerm}
            onChange={(e) => setDriverSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-primary">Add New Driver</button>
        </div>
      </div>
      <div className="driver-cards">
        {filteredDrivers.map(driver => (
          <div key={driver.id} className="driver-card">
            <div className="driver-header">
              <div className="driver-avatar">{driver.name.charAt(0)}</div>
              <div className="driver-info">
                <h3>{driver.name}</h3>
              </div>
              <span className={`status ${driver.status}`}>{driver.status}</span>
            </div>
            <div className="driver-details">
              <div className="detail-row">
                <span>Full Name:</span>
                <span>{driver.name}</span>
              </div>
              <div className="detail-row">
                <span>Phone Number:</span>
                <span>{driver.phone}</span>
              </div>
              <div className="detail-row">
                <span>Email Address:</span>
                <span>{driver.email}</span>
              </div>
              <div className="detail-row">
                <span>Password:</span>
                <div className="password-field">
                  <span>{driverPasswordVisibility[driver.id] ? 'password123' : '••••••••'}</span>
                  <button
                    className="eye-icon"
                    onClick={() => toggleDriverPasswordVisibility(driver.id)}
                    title={driverPasswordVisibility[driver.id] ? 'Hide password' : 'Show password'}
                  >
                    {driverPasswordVisibility[driver.id] ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
              <div className="detail-row">
                <span>Driver's License Number:</span>
                <span>{driver.licenseNumber}</span>
              </div>
              <div className="detail-row">
                <span>Upload License:</span>
                <span>license_file.pdf</span>
              </div>
              <div className="detail-row">
                <span>Upload Vehicle Document:</span>
                <span>vehicle_doc.pdf</span>
              </div>
              <div className="detail-row">
                <span>Vehicle Type:</span>
                <span>{driver.vehicleType}</span>
              </div>
              <div className="detail-row">
                <span>Vehicle Number:</span>
                <span>{driver.vehicleNumber}</span>
              </div>
              <div className="detail-row">
                <span>Number of Seats:</span>
                <span>{driver.seats}</span>
              </div>
            </div>
            <div className="driver-actions">
              <button className="btn-secondary">View Details</button>
              <button className="btn-danger">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="students-content">
      <div className="content-header">
        <h2>Student Management</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search students by name, username, email, phone..."
            value={studentSearchTerm}
            onChange={(e) => setStudentSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-primary">Add New Student</button>
        </div>
      </div>
      <div className="student-cards">
        {filteredStudents.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-header">
              <div className="student-avatar">{student.fullName.charAt(0)}</div>
              <div className="student-info">
                <h3>{student.fullName}</h3>
                <p className="username">@{student.username}</p>
              </div>
              <span className={`status ${student.status}`}>{student.status}</span>
            </div>
            <div className="student-details">
              <div className="detail-row">
                <span>Username:</span>
                <span>@{student.username}</span>
              </div>
              <div className="detail-row">
                <span>Full Name:</span>
                <span>{student.fullName}</span>
              </div>
              <div className="detail-row">
                <span>Email Address:</span>
                <span>{student.email}</span>
              </div>
              <div className="detail-row">
                <span>Mobile Number:</span>
                <span>{student.mobile}</span>
              </div>
              <div className="detail-row">
                <span>University:</span>
                <span>{student.university}</span>
              </div>
              <div className="detail-row">
                <span>Home Address:</span>
                <span>{student.homeAddress}</span>
              </div>
              <div className="detail-row">
                <span>Password:</span>
                <div className="password-field">
                  <span>{passwordVisibility[student.id] ? 'password123' : '••••••••'}</span>
                  <button
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility(student.id)}
                    title={passwordVisibility[student.id] ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisibility[student.id] ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
              <div className="detail-row">
                <span>Parent/Guardian Name:</span>
                <span>{student.parentName}</span>
              </div>
              <div className="detail-row">
                <span>Parent/Guardian Email Address:</span>
                <span>{student.parentEmail}</span>
              </div>
              <div className="detail-row">
                <span>Parent/Guardian Mobile Number:</span>
                <span>{student.parentPhone}</span>
              </div>
              <div className="detail-row">
                <span>Total Bookings:</span>
                <span>{student.totalBookings}</span>
              </div>
            </div>
            <div className="student-actions">
              <button className="btn-secondary">View Details</button>
              <button className="btn-danger">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmergencies = () => (
    <div className="emergencies-content">
      <div className="content-header">
        <h2>Emergency Reports</h2>
        <div className="filters">
          <select className="filter-select">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>
      <div className="emergency-list">
        {emergencies.map(emergency => (
          <div key={emergency.id} className="emergency-item">
            <div className="emergency-main">
              <div className="emergency-icon">🚨</div>
              <div className="emergency-info">
                <h3>{emergency.emergencyType}</h3>
                <p>{emergency.driverName} • {emergency.busNumber}</p>
                <p className="location">📍 {emergency.location}</p>
                <p className="timestamp">🕐 {emergency.timestamp}</p>
              </div>
              <span className={`status ${emergency.status}`}>{emergency.status}</span>
            </div>
            <div className="emergency-actions">
              <button className="btn-secondary">View Details</button>
              <button className="btn-primary">Mark Resolved</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-content">
      <div className="analytics-header">
        <h2>📈 Analytics Dashboard</h2>
        <div className="analytics-filters">
          <select className="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-info">
            <h3>$12,450</h3>
            <p>Total Revenue</p>
            <span className="metric-change positive">+12.5%</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-info">
            <h3>1,247</h3>
            <p>Total Trips</p>
            <span className="metric-change positive">+8.2%</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-info">
            <h3>94.2%</h3>
            <p>On-Time Rate</p>
            <span className="metric-change positive">+2.1%</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <div className="chart-card large">
          <h3>📊 Revenue Trends</h3>
          <div className="revenue-chart">
            <div className="chart-area">
              <div className="revenue-bar" style={{height: '60%'}} data-month="Jan" data-value="$2,100"></div>
              <div className="revenue-bar" style={{height: '75%'}} data-month="Feb" data-value="$2,625"></div>
              <div className="revenue-bar" style={{height: '85%'}} data-month="Mar" data-value="$2,975"></div>
              <div className="revenue-bar" style={{height: '70%'}} data-month="Apr" data-value="$2,450"></div>
              <div className="revenue-bar" style={{height: '90%'}} data-month="May" data-value="$3,150"></div>
              <div className="revenue-bar" style={{height: '95%'}} data-month="Jun" data-value="$3,325"></div>
            </div>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>🚐 Trip Distribution</h3>
          <div className="pie-chart-container">
            <svg viewBox="0 0 200 200" className="pie-svg">
              {/* Morning - 45% */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#2ECC71"
                strokeWidth="40"
                strokeDasharray="226 0"
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
              {/* Afternoon - 35% */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#F1C40F"
                strokeWidth="40"
                strokeDasharray="157 69"
                strokeDashoffset="-226"
                transform="rotate(-90 100 100)"
              />
              {/* Evening - 20% */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#E74C3C"
                strokeWidth="40"
                strokeDasharray="113 113"
                strokeDashoffset="-383"
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="pie-legend">
              <div className="legend-item">
                <div className="legend-color" style={{background: '#2ECC71'}}></div>
                <span>Morning (45%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#F1C40F'}}></div>
                <span>Afternoon (35%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#E74C3C'}}></div>
                <span>Evening (20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-analytics">
        <div className="analytics-card">
          <h3>🏆 Top Performing Drivers</h3>
          <div className="top-drivers">
            {drivers.slice(0, 5).map((driver, index) => (
              <div key={driver.id} className="driver-rank">
                <div className="rank-number">#{index + 1}</div>
                <div className="driver-details">
                  <span className="driver-name">{driver.name}</span>
                  <span className="driver-stats">{driver.totalTrips} trips</span>
                </div>
                <div className="rank-badge">{index < 3 ? '🥇🥈🥉'[index] : '🏅'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>📍 Popular Routes</h3>
          <div className="popular-routes">
            <div className="route-item">
              <div className="route-path">
                <span className="route-from">Colombo</span>
                <span className="route-arrow">→</span>
                <span className="route-to">Kandy</span>
              </div>
              <div className="route-stats">234 trips • 45% of total</div>
            </div>
            <div className="route-item">
              <div className="route-path">
                <span className="route-from">Colombo</span>
                <span className="route-arrow">→</span>
                <span className="route-to">Moratuwa</span>
              </div>
              <div className="route-stats">189 trips • 32% of total</div>
            </div>
            <div className="route-item">
              <div className="route-path">
                <span className="route-from">Colombo</span>
                <span className="route-arrow">→</span>
                <span className="route-to">Negombo</span>
              </div>
              <div className="route-stats">145 trips • 23% of total</div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>📊 User Growth</h3>
          <div className="growth-chart">
            <div className="growth-metric">
              <span className="growth-label">New Students</span>
              <span className="growth-value">+24</span>
              <span className="growth-change positive">+15%</span>
            </div>
            <div className="growth-metric">
              <span className="growth-label">New Drivers</span>
              <span className="growth-value">+3</span>
              <span className="growth-change positive">+8%</span>
            </div>
            <div className="growth-metric">
              <span className="growth-label">Active Users</span>
              <span className="growth-value">98.5%</span>
              <span className="growth-change positive">+2.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>🏢 Admin</h1>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="nav-icon">📊</span>
            Overview
          </button>
          <button
            className={`nav-item ${activeSection === 'drivers' ? 'active' : ''}`}
            onClick={() => setActiveSection('drivers')}
          >
            <span className="nav-icon">👥</span>
            Drivers
          </button>
          <button
            className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
            onClick={() => setActiveSection('students')}
          >
            <span className="nav-icon">🎓</span>
            Students
          </button>
          <button
            className={`nav-item ${activeSection === 'emergencies' ? 'active' : ''}`}
            onClick={() => setActiveSection('emergencies')}
          >
            <span className="nav-icon">🚨</span>
            Emergencies
          </button>
          <button
            className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveSection('analytics')}
          >
            <span className="nav-icon">📈</span>
            Analytics
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="top-header">
          <h1>
            {activeSection === 'overview' && 'Dashboard Overview'}
            {activeSection === 'drivers' && 'Driver Management'}
            {activeSection === 'students' && 'Student Management'}
            {activeSection === 'emergencies' && 'Emergency Reports'}
            {activeSection === 'analytics' && 'Analytics'}
          </h1>
          <div className="header-actions">
            <button className="btn-secondary">Export Data</button>
            <button className="btn-secondary">Settings</button>
          </div>
        </header>

        <main className="content-area">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'drivers' && renderDrivers()}
          {activeSection === 'students' && renderStudents()}
          {activeSection === 'emergencies' && renderEmergencies()}
          {activeSection === 'analytics' && renderAnalytics()}
        </main>
      </div>

      <style>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f8f9fa;
          margin-top: 80px;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #8417BA 0%, #6B1297 100%);
          color: white;
          padding: 30px 0;
          position: fixed;
          height: calc(100vh - 80px);
          left: 0;
          top: 80px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar-header {
          padding: 0 30px 30px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .sidebar-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .sidebar-nav {
          padding: 20px 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 15px 30px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .nav-item.active {
          background: rgba(255,255,255,0.2);
          color: white;
          border-right: 3px solid white;
        }

        .nav-icon {
          margin-right: 12px;
          font-size: 1.2rem;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }

        .top-header {
          background: white;
          padding: 25px 40px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .top-header h1 {
          margin: 0;
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .content-area {
          flex: 1;
          padding: 30px 40px;
          overflow-y: auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          font-size: 3rem;
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          border-radius: 12px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          margin: 0 0 5px 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
        }

        .stat-info p {
          margin: 0 0 10px 0;
          color: #718096;
          font-weight: 500;
        }

        .stat-badge {
          background: #e6fffa;
          color: #065f46;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .recent-emergencies h2 {
          margin-bottom: 25px;
          color: #2d3748;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .emergency-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .emergency-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border-left: 4px solid #e53e3e;
        }

        .emergency-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .emergency-type {
          font-weight: 600;
          color: #2d3748;
        }

        .emergency-details p {
          margin: 5px 0;
          color: #718096;
          font-size: 0.9rem;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .content-header h2 {
          margin: 0;
          color: #2d3748;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .driver-cards, .student-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 25px;
        }

        .driver-card, .student-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          transition: transform 0.2s ease;
        }

        .driver-card:hover, .student-card:hover {
          transform: translateY(-2px);
        }

        .driver-header, .student-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .driver-avatar, .student-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .driver-info h3, .student-info h3 {
          margin: 0 0 5px 0;
          color: #2d3748;
          font-size: 1.2rem;
        }

        .driver-info p, .student-info p {
          margin: 0;
          color: #718096;
        }

        .username {
          color: #a0aec0 !important;
          font-size: 0.9rem;
        }

        .status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status.active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status.inactive {
          background: #fed7d7;
          color: #742a2a;
        }

        .status.pending {
          background: #fef5e7;
          color: #7c2d12;
        }

        .status.resolved {
          background: #c6f6d5;
          color: #22543d;
        }

        .status.in_progress {
          background: #bee3f8;
          color: #2a4365;
        }

        .driver-details, .student-details {
          margin-bottom: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f7fafc;
        }

        .detail-row span:first-child {
          color: #718096;
          font-weight: 500;
        }

        .detail-row span:last-child {
          color: #2d3748;
          font-weight: 600;
        }

        .driver-actions, .student-actions {
          display: flex;
          gap: 10px;
        }

        .emergency-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .emergency-item {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border-left: 4px solid #e53e3e;
        }

        .emergency-main {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 15px;
        }

        .emergency-icon {
          font-size: 2rem;
        }

        .emergency-info h3 {
          margin: 0 0 8px 0;
          color: #2d3748;
        }

        .emergency-info p {
          margin: 3px 0;
          color: #718096;
          font-size: 0.9rem;
        }

        .location, .timestamp {
          color: #4a5568 !important;
        }

        .emergency-actions {
          display: flex;
          gap: 10px;
        }

        .analytics-content h2 {
          margin-bottom: 30px;
          color: #2d3748;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .analytics-filters {
          display: flex;
          gap: 15px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .metric-card {
          background: white;
          padding: 25px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          transition: transform 0.2s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
        }

        .metric-icon {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          border-radius: 12px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-info h3 {
          margin: 0 0 5px 0;
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .metric-info p {
          margin: 0 0 8px 0;
          color: #718096;
          font-weight: 500;
        }

        .metric-change {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .metric-change.positive {
          background: #c6f6d5;
          color: #22543d;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          margin-bottom: 40px;
        }

        .chart-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
        }

        .chart-card.large {
          grid-column: 1;
        }

        .chart-card h3 {
          margin-bottom: 20px;
          color: #2d3748;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .revenue-chart {
          height: 200px;
        }

        .chart-area {
          display: flex;
          align-items: end;
          gap: 20px;
          height: 150px;
          padding: 20px 0;
          justify-content: space-between;
        }

        .revenue-bar {
          flex: 1;
          background: linear-gradient(180deg, #8417BA 0%, #6B1297 100%);
          border-radius: 4px 4px 0 0;
          min-height: 20px;
          position: relative;
          transition: all 0.3s ease;
        }

        .revenue-bar:hover {
          opacity: 0.8;
        }

        .revenue-bar::after {
          content: attr(data-value);
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: #2d3748;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .revenue-bar:hover::after {
          opacity: 1;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 0.85rem;
          color: #718096;
          font-weight: 500;
        }

        .pie-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .pie-svg {
          width: 200px;
          height: 200px;
        }

        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-item span {
          font-size: 0.85rem;
          color: #4a5568;
        }

        .bottom-analytics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .top-drivers {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .driver-rank {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f7fafc;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .driver-rank:hover {
          background: #edf2f7;
        }

        .rank-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: #8417BA;
          min-width: 30px;
        }

        .driver-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .driver-name {
          font-weight: 600;
          color: #2d3748;
        }

        .driver-stats {
          font-size: 0.85rem;
          color: #718096;
        }

        .rank-badge {
          font-size: 1.5rem;
        }

        .popular-routes {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .route-item {
          padding: 15px;
          background: #f7fafc;
          border-radius: 8px;
          border-left: 4px solid #8417BA;
        }

        .route-path {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .route-from, .route-to {
          font-weight: 600;
          color: #2d3748;
        }

        .route-arrow {
          color: #8417BA;
          font-weight: 700;
        }

        .route-stats {
          font-size: 0.85rem;
          color: #718096;
        }

        .growth-chart {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .growth-metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f7fafc;
        }

        .growth-metric:last-child {
          border-bottom: none;
        }

        .growth-label {
          font-weight: 500;
          color: #4a5568;
        }

        .growth-value {
          font-weight: 700;
          color: #2d3748;
        }

        .growth-change {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          background: #c6f6d5;
          color: #22543d;
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
          .chart-card.large {
            grid-column: auto;
          }
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          .bottom-analytics {
            grid-template-columns: 1fr;
          }
          .analytics-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }

        .btn-primary {
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(132, 23, 186, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #4a5568;
          border: 2px solid #e2e8f0;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
        }

        .btn-danger {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-danger:hover {
          background: #c53030;
        }

        .filter-select {
          padding: 8px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          color: #4a5568;
          font-weight: 500;
        }

        .filters {
          display: flex;
          gap: 15px;
        }

        .password-field {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .eye-icon {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
          border-radius: 3px;
          transition: background-color 0.2s ease;
          font-size: 14px;
        }

        .eye-icon:hover {
          background: rgba(0,0,0,0.1);
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .content-header h2 {
          margin: 0;
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .search-input {
          padding: 10px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #4a5568;
          font-size: 0.9rem;
          width: 300px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #8417BA;
          box-shadow: 0 0 0 3px rgba(132, 23, 186, 0.1);
        }

        .search-input::placeholder {
          color: #a0aec0;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 250px;
          }
          .main-content {
            margin-left: 250px;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            position: static;
            padding: 20px 0;
          }
          .sidebar-nav {
            display: flex;
            overflow-x: auto;
            padding: 0 20px;
          }
          .nav-item {
            flex-shrink: 0;
            padding: 12px 20px;
          }
          .main-content {
            margin-left: 0;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .driver-cards, .student-cards {
            grid-template-columns: 1fr;
          }
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          .search-input {
            width: 100%;
            max-width: 300px;
          }
          .header-actions {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;