import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginView, setLoginView] = useState<'select' | 'rider' | 'student'>('select');
  const [signupView, setSignupView] = useState<'select' | 'rider' | 'student'>('select');
  const [headingRef1, heading1Visible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const [headingRef2, heading2Visible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, delay: 300 });
  const [headingRef3, heading3Visible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, delay: 600 });
  const [taglineRef, taglineVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, delay: 900 });
  const [loginRef, loginVisible] = useScrollAnimation<HTMLButtonElement>({ threshold: 0.2, delay: 1200 });
  const [signupRef, signupVisible] = useScrollAnimation<HTMLButtonElement>({ threshold: 0.2, delay: 1500 });

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSignupModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setLoginView('select');
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
    setSignupView('select');
  };

  const handleRiderLoginClick = () => {
    setLoginView('rider');
  };

  const handleStudentLoginClick = () => {
    setLoginView('student');
  };

  const handleAdminLoginClick = () => {
    setLoginView('admin');
  };

  const handleRiderSignupClick = () => {
    setSignupView('rider');
  };

  const handleStudentSignupClick = () => {
    setSignupView('student');
  };

  const handleBackToSelect = () => {
    setLoginView('select');
  };

  const handleBackToSignupSelect = () => {
    setSignupView('select');
  };

  return (
    <>
      <section id="home" className="landing-page">
        <div className="landing-bg-image"></div>
        <div className="content">
          <div className="left-side">
            <h2 
              ref={headingRef1} 
              className={`header-university fade-right ${heading1Visible ? 'visible' : ''}`}
            >
              University
            </h2>
            <h2 
              ref={headingRef2} 
              className={`header-shuttle fade-right ${heading2Visible ? 'visible' : ''}`}
            >
              Shuttle
            </h2>
            <h2 
              ref={headingRef3} 
              className={`header-service fade-right ${heading3Visible ? 'visible' : ''}`}
            >
              Service
            </h2>
            <div 
              ref={taglineRef} 
              className={`header-tagline fade-up ${taglineVisible ? 'visible' : ''}`}
            >
              Ride smart. Track live. Stay connected on campus.
            </div>
            <div className="buttons-container">
              <button 
                ref={loginRef}
                onClick={handleLoginClick}
                className={`login-btn-main fade-up ${loginVisible ? 'visible' : ''}`}
              >
                LOGIN
              </button>
              <button 
                ref={signupRef}
                onClick={handleSignupClick}
                className={`signup-btn-main fade-up ${signupVisible ? 'visible' : ''}`}
              >
                SIGNUP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeLoginModal}>
              <i className="fas fa-times"></i>
            </button>
            
            {loginView === 'select' && (
              <>
                <h2 className="modal-title">Choose Login Type</h2>
                <p className="modal-subtitle">Select your account type to continue</p>

                <div className="login-options">
                  <div className="login-option">
                    <div className="login-option-icon rider-icon">
                      <i className="fas fa-id-card"></i>
                    </div>
                    <h3>Rider Login</h3>
                    <p>Access driver dashboard and manage routes</p>
                    <button className="option-btn rider-btn" onClick={handleRiderLoginClick}>
                      Rider
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>

                  <div className="login-option">
                    <div className="login-option-icon student-icon">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h3>Student Login</h3>
                    <p>Track shuttles and book your rides</p>
                    <button className="option-btn student-btn" onClick={handleStudentLoginClick}>
                      Student
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>

                  <div className="login-option">
                    <div className="login-option-icon admin-icon">
                      <i className="fas fa-cog"></i>
                    </div>
                    <h3>Admin Login</h3>
                    <p>Manage system and users only</p>
                    <button className="option-btn admin-btn" onClick={handleAdminLoginClick}>
                      Admin
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </>
            )}

            {loginView === 'rider' && (
              <>
                <button className="back-btn" onClick={handleBackToSelect}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="modal-title">Rider Login</h2>
                <p className="modal-subtitle">Welcome back! Please enter your details</p>

                <form className="login-form">
                  <div className="form-group">
                                        <label htmlFor="rider-username">
                      <i className="fas fa-user-circle"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      id="rider-username"
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rider-password">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <input
                      type="password"
                      id="rider-password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>

                  <button type="submit" className="submit-btn">
                    Login as Rider
                    <i className="fas fa-sign-in-alt"></i>
                  </button>

                  <p className="form-footer">
                    Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeLoginModal(); handleSignupClick(e); }}>Sign up</a>
                  </p>
                </form>
              </>
            )}

            {loginView === 'student' && (
              <>
                <button className="back-btn" onClick={handleBackToSelect}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="modal-title">Student Login</h2>
                <p className="modal-subtitle">Welcome back! Please enter your details</p>

                <form className="login-form" onSubmit={(e) => {
                  e.preventDefault();
                  closeLoginModal();
                  navigate('/student-dashboard');
                }}>
                  <div className="form-group">
                                        <label htmlFor="student-username">
                      <i className="fas fa-user-circle"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      id="student-username"
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-password">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <input
                      type="password"
                      id="student-password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>

                  <button type="submit" className="submit-btn">
                    Login as Student
                    <i className="fas fa-sign-in-alt"></i>
                  </button>

                  <p className="form-footer">
                    Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeLoginModal(); handleSignupClick(e); }}>Sign up</a>
                  </p>
                </form>
              </>
            )}

            {loginView === 'admin' && (
              <>
                <button className="back-btn" onClick={handleBackToSelect}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="modal-title">Admin Login</h2>
                <p className="modal-subtitle">Welcome back! Please enter your details</p>

                <form className="login-form" onSubmit={(e) => {
                  e.preventDefault();
                  closeLoginModal();
                  navigate('/admin-dashboard');
                }}>
                  <div className="form-group">
                                        <label htmlFor="admin-username">
                      <i className="fas fa-user-circle"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      id="admin-username"
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="admin-password">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <input
                      type="password"
                      id="admin-password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>

                  <button type="submit" className="submit-btn">
                    Login as Admin
                    <i className="fas fa-sign-in-alt"></i>
                  </button>

                  <p className="form-footer">
                    Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeLoginModal(); handleSignupClick(e); }}>Sign up</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="login-modal-overlay" onClick={closeSignupModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSignupModal}>
              <i className="fas fa-times"></i>
            </button>
            
            {signupView === 'select' && (
              <>
                <h2 className="modal-title">Choose Signup Type</h2>
                <p className="modal-subtitle">Select your account type to register</p>

                <div className="login-options">
                  <div className="login-option">
                    <div className="login-option-icon rider-icon">
                      <i className="fas fa-id-card"></i>
                    </div>
                    <h3>Rider Signup</h3>
                    <p>Register as a driver and start earning</p>
                    <button className="option-btn rider-btn" onClick={handleRiderSignupClick}>
                      Signup as Rider
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>

                  <div className="login-option">
                    <div className="login-option-icon student-icon">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h3>Student Signup</h3>
                    <p>Register to track and book shuttle rides</p>
                    <button className="option-btn student-btn" onClick={handleStudentSignupClick}>
                      Signup as Student
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </>
            )}

            {signupView === 'rider' && (
              <>
                <button className="back-btn" onClick={handleBackToSignupSelect}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="modal-title">Rider Signup</h2>
                <p className="modal-subtitle">Create your rider account</p>

                <form className="login-form signup-form-extended">
                  {/* Personal Details Section */}
                  <div className="form-section">
                    <h3 className="section-heading">
                      <i className="fas fa-user-circle"></i> Personal Details
                    </h3>
                    <div className="form-group">
                      <label htmlFor="rider-signup-name">
                        <i className="fas fa-user"></i> Full Name
                      </label>
                      <input
                        type="text"
                        id="rider-signup-name"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-signup-phone">
                        <i className="fas fa-phone"></i> Phone Number
                      </label>
                      <input
                        type="tel"
                        id="rider-signup-phone"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-signup-email">
                        <i className="fas fa-envelope"></i> Email Address
                      </label>
                      <input
                        type="email"
                        id="rider-signup-email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-signup-password">
                        <i className="fas fa-lock"></i> Password
                      </label>
                      <input
                        type="password"
                        id="rider-signup-password"
                        placeholder="Create a password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-signup-confirm-password">
                        <i className="fas fa-lock"></i> Confirm Password
                      </label>
                      <input
                        type="password"
                        id="rider-signup-confirm-password"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  {/* License and Documents Section */}
                  <div className="form-section">
                    <h3 className="section-heading">
                      <i className="fas fa-id-card"></i> License & Documents
                    </h3>
                    <div className="form-group">
                      <label htmlFor="rider-license-number">
                        <i className="fas fa-id-badge"></i> Driver's License Number
                      </label>
                      <input
                        type="text"
                        id="rider-license-number"
                        placeholder="Enter your license number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-license-upload">
                        <i className="fas fa-upload"></i> Upload License
                      </label>
                      <input
                        type="file"
                        id="rider-license-upload"
                        accept="image/*,.pdf"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-vehicle-doc-upload">
                        <i className="fas fa-upload"></i> Upload Vehicle Document
                      </label>
                      <input
                        type="file"
                        id="rider-vehicle-doc-upload"
                        accept="image/*,.pdf"
                        required
                      />
                    </div>
                  </div>

                  {/* Vehicle Details Section */}
                  <div className="form-section">
                    <h3 className="section-heading">
                      <i className="fas fa-car"></i> Vehicle Details
                    </h3>
                    <div className="form-group">
                      <label htmlFor="rider-vehicle-type">
                        <i className="fas fa-shuttle-van"></i> Vehicle Type
                      </label>
                      <select id="rider-vehicle-type" required>
                        <option value="">Select vehicle type</option>
                        <option value="bus">Bus</option>
                        <option value="minibus">Minibus</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-vehicle-number">
                        <i className="fas fa-hashtag"></i> Vehicle Number
                      </label>
                      <input
                        type="text"
                        id="rider-vehicle-number"
                        placeholder="Enter vehicle registration number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rider-seats">
                        <i className="fas fa-chair"></i> Number of Seats
                      </label>
                      <input
                        type="number"
                        id="rider-seats"
                        placeholder="Enter number of seats"
                        min="1"
                        max="50"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    Create Rider Account
                    <i className="fas fa-user-plus"></i>
                  </button>

                  <p className="form-footer">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeSignupModal(); handleLoginClick(e); }}>Login</a>
                  </p>
                </form>
              </>
            )}

            {signupView === 'student' && (
              <>
                <button className="back-btn" onClick={handleBackToSignupSelect}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="modal-title">Student Signup</h2>
                <p className="modal-subtitle">Create your student account</p>

                <form className="login-form signup-form-extended">
                  {/* Student Details Section */}
                  <div className="form-section">
                    <h3 className="section-heading">
                      <i className="fas fa-user-graduate"></i>
                      Student Details
                    </h3>

                    <div className="form-group">
                      <label htmlFor="student-username">
                        <i className="fas fa-user-circle"></i> Username
                      </label>
                      <input
                        type="text"
                        id="student-username"
                        placeholder="Choose a username"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-fullname">
                        <i className="fas fa-user"></i> Full Name
                      </label>
                      <input
                        type="text"
                        id="student-fullname"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-email">
                        <i className="fas fa-envelope"></i> Email Address
                      </label>
                      <input
                        type="email"
                        id="student-email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-mobile">
                        <i className="fas fa-phone"></i> Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="student-mobile"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-university">
                        <i className="fas fa-university"></i> University
                      </label>
                      <input
                        type="text"
                        id="student-university"
                        placeholder="Enter your university name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-address">
                        <i className="fas fa-home"></i> Home Address
                      </label>
                      <input
                        type="text"
                        id="student-address"
                        placeholder="Enter your home address"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="student-password">
                        <i className="fas fa-lock"></i> Password
                      </label>
                      <input
                        type="password"
                        id="student-password"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  {/* Parent/Guardian Information Section */}
                  <div className="form-section">
                    <h3 className="section-heading">
                      <i className="fas fa-user-friends"></i>
                      Parent/Guardian Information
                    </h3>

                    <div className="form-group">
                      <label htmlFor="guardian-name">
                        <i className="fas fa-user"></i> Parent/Guardian Name
                      </label>
                      <input
                        type="text"
                        id="guardian-name"
                        placeholder="Enter parent/guardian name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="guardian-email">
                        <i className="fas fa-envelope"></i> Email Address
                      </label>
                      <input
                        type="email"
                        id="guardian-email"
                        placeholder="Enter parent/guardian email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="guardian-mobile">
                        <i className="fas fa-phone"></i> Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="guardian-mobile"
                        placeholder="Enter parent/guardian mobile"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    Create Student Account
                    <i className="fas fa-user-plus"></i>
                  </button>

                  <p className="form-footer">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); closeSignupModal(); handleLoginClick(e); }}>Login</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}