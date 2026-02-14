import React, { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DriverProfile = () => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState('/backgrounds/user.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    fullName: 'John Smith',
    email: 'john.smith@shuttle.com',
    phone: '+94 77 123 4567',
    licenseNumber: 'DL123456789',
    vehicleType: 'Bus',
    vehicleNumber: 'BUS 101',
    vehicleModel: 'Toyota Coaster',
    seats: 45,
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+94 77 987 6543',
    address: '456 Driver Street, Colombo, Sri Lanka'
  });

  const [profileRef, profileVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    // Load profile data from localStorage if exists
    const savedProfile = localStorage.getItem('driverProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }

    // Load profile image from localStorage if exists
    const savedImage = localStorage.getItem('driverProfileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditField = (field: string) => {
    setEditingField(field);
  };

  const handleSaveField = (field: string) => {
    setEditingField(null);
    // Save profile data and image to localStorage
    localStorage.setItem('driverProfile', JSON.stringify(profileData));
    localStorage.setItem('driverProfileImage', profileImage);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageError = () => {
    // If image fails to load, we'll show the avatar fallback
    setProfileImage('');
  };

  return (
    <div className="driver-profile-page">
      <div className="dashboard-wrapper">
        {/* Profile Section */}
        <div ref={profileRef} className={`profile-section fade-up ${profileVisible ? 'visible' : ''}`}>
          <div className="profile-header">
            <h2 className="section-title">Driver Profile</h2>
          </div>

          <div className="profile-content">
            <div className="profile-image-section">
              <div className="profile-image-container">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Driver Profile"
                    className="profile-image"
                    onClick={handleImageClick}
                    onError={handleImageError}
                  />
                ) : (
                  <div className="profile-avatar" onClick={handleImageClick}>
                    <span className="avatar-initials">{getInitials(profileData.fullName)}</span>
                  </div>
                )}
                <div className="image-overlay" onClick={handleImageClick}>
                  <i className="fas fa-camera"></i>
                  <span>Change Photo</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <h3 className="driver-name">{profileData.fullName}</h3>
              <p className="driver-status">Active Driver</p>
            </div>

            <div className="profile-details">
              <div className="info-section">
                <h4>Personal Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    {editingField === 'fullName' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('fullName')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.fullName}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('fullName')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    {editingField === 'email' ? (
                      <div className="edit-field">
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('email')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.email}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('email')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Phone Number</label>
                    {editingField === 'phone' ? (
                      <div className="edit-field">
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('phone')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.phone}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('phone')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Address</label>
                    {editingField === 'address' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('address')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.address}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('address')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h4>License & Vehicle Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Driver's License Number</label>
                    {editingField === 'licenseNumber' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.licenseNumber}
                          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('licenseNumber')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.licenseNumber}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('licenseNumber')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Vehicle Type</label>
                    {editingField === 'vehicleType' ? (
                      <div className="edit-field">
                        <select
                          value={profileData.vehicleType}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                        >
                          <option value="Bus">Bus</option>
                          <option value="Minibus">Minibus</option>
                          <option value="Van">Van</option>
                        </select>
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('vehicleType')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.vehicleType}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('vehicleType')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Vehicle Number</label>
                    {editingField === 'vehicleNumber' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.vehicleNumber}
                          onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('vehicleNumber')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.vehicleNumber}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('vehicleNumber')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Vehicle Model</label>
                    {editingField === 'vehicleModel' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.vehicleModel}
                          onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('vehicleModel')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.vehicleModel}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('vehicleModel')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Number of Seats</label>
                    {editingField === 'seats' ? (
                      <div className="edit-field">
                        <input
                          type="number"
                          value={profileData.seats}
                          onChange={(e) => handleInputChange('seats', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('seats')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.seats} seats</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('seats')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h4>Emergency Contact</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Emergency Contact Name</label>
                    {editingField === 'emergencyContact' ? (
                      <div className="edit-field">
                        <input
                          type="text"
                          value={profileData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('emergencyContact')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.emergencyContact}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('emergencyContact')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="info-item">
                    <label>Emergency Contact Phone</label>
                    {editingField === 'emergencyPhone' ? (
                      <div className="edit-field">
                        <input
                          type="tel"
                          value={profileData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        />
                        <div className="field-actions">
                          <button className="save-field-btn" onClick={() => handleSaveField('emergencyPhone')}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button className="cancel-field-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="display-field">
                        <span>{profileData.emergencyPhone}</span>
                        <button className="edit-field-btn" onClick={() => handleEditField('emergencyPhone')}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .driver-profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
          margin-top: 80px;
        }

        .dashboard-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-section {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .profile-section.fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .section-title {
          color: #2d3748;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          align-items: start;
        }

        .profile-image-section {
          text-align: center;
        }

        .profile-image-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .profile-image-container:hover {
          border-color: #8417BA;
          transform: scale(1.05);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8417BA 0%, #6B1297 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          font-weight: 700;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
        }

        .profile-image-container:hover .image-overlay {
          opacity: 1;
        }

        .image-overlay i {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .driver-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 5px 0;
        }

        .driver-status {
          color: #48bb78;
          font-weight: 600;
          margin: 0;
          font-size: 0.9rem;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .info-section h4 {
          color: #2d3748;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-item {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        .info-item label {
          display: block;
          color: #718096;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .display-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .display-field span {
          color: #2d3748;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .edit-field-btn {
          background: none;
          border: none;
          color: #718096;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-size: 0.8rem;
        }

        .edit-field-btn:hover {
          background: #e2e8f0;
          color: #4a5568;
        }

        .edit-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .edit-field input,
        .edit-field select {
          padding: 10px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: border-color 0.2s ease;
        }

        .edit-field input:focus,
        .edit-field select:focus {
          outline: none;
          border-color: #8417BA;
          box-shadow: 0 0 0 3px rgba(132, 23, 186, 0.1);
        }

        .field-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .save-field-btn {
          background: #48bb78;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background-color 0.2s ease;
        }

        .save-field-btn:hover {
          background: #38a169;
        }

        .cancel-field-btn {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background-color 0.2s ease;
        }

        .cancel-field-btn:hover {
          background: #c53030;
        }

        @media (max-width: 768px) {
          .driver-profile-page {
            padding: 15px;
            margin-top: 70px;
          }

          .profile-section {
            padding: 20px;
          }

          .profile-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .profile-image-container {
            width: 150px;
            height: 150px;
          }

          .section-title {
            font-size: 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .info-item {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default DriverProfile;