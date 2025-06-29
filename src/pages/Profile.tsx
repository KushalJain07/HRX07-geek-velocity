import React, { useState } from 'react';
import { Home, Users, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'profile'>('profile');
  const [profileTab, setProfileTab] = useState<'profile' | 'settings' | 'notifications'>('profile');
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    classUpdates: true,
    studentMessages: true,
    reminders: true
  });

  const teacherData = {
    name: user?.name || "Sarah Johnson",
    email: user?.email || "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    grade: "9th Grade",
    experience: "8 years",
    subjects: ["Algebra", "Geometry", "Calculus"],
    bio: "Passionate mathematics teacher with 8 years of experience in high school education. Specialized in making complex mathematical concepts accessible to all students.",
    location: "Room 205, Building A",
    officeHours: "Mon-Fri 3:00 PM - 4:00 PM"
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNav = (tab: 'dashboard' | 'students' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/dashboard');
    if (tab === 'students') navigate('/students');
    if (tab === 'profile') navigate('/profile');
  };

  const handleProfileTab = (tab: 'profile' | 'settings' | 'notifications') => {
    setProfileTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden pb-24">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="relative z-10 profile-container">
        <div className="profile-header">
          <div className="profile-image-section">
            <img src="/teacher.png" alt="Teacher Profile" className="profile-image" />
            <div className="profile-badge">Teacher</div>
          </div>
          <div className="profile-info">
            <h1 className="teacher-name">{teacherData.name}</h1>
            <p className="teacher-title">{teacherData.department} • {teacherData.grade}</p>
            <p className="teacher-email">{teacherData.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${profileTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleProfileTab('profile')}
          >
            Profile Info
          </button>
          <button 
            className={`tab-btn ${profileTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleProfileTab('settings')}
          >
            Settings
          </button>
          <button 
            className={`tab-btn ${profileTab === 'notifications' ? 'active' : ''}`}
            onClick={() => handleProfileTab('notifications')}
          >
            Notifications
          </button>
        </div>

        <div className="profile-content">
          {profileTab === 'profile' && (
            <div className="profile-details">
              <div className="info-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <span>{teacherData.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <span>{teacherData.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <span>{teacherData.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Department</label>
                    <span>{teacherData.department}</span>
                  </div>
                  <div className="info-item">
                    <label>Grade Level</label>
                    <span>{teacherData.grade}</span>
                  </div>
                  <div className="info-item">
                    <label>Experience</label>
                    <span>{teacherData.experience}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Subjects Taught</h3>
                <div className="subjects-list">
                  {teacherData.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">{subject}</span>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <h3>Bio</h3>
                <p className="bio-text">{teacherData.bio}</p>
              </div>

              <div className="info-section">
                <h3>Location & Office Hours</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Classroom</label>
                    <span>{teacherData.location}</span>
                  </div>
                  <div className="info-item">
                    <label>Office Hours</label>
                    <span>{teacherData.officeHours}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileTab === 'settings' && (
            <div className="settings-section">
              <div className="setting-group">
                <h3>Account Settings</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Change Password</h4>
                    <p>Update your account password</p>
                  </div>
                  <button className="setting-btn">Change</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Update Profile Picture</h4>
                    <p>Change your profile image</p>
                  </div>
                  <button className="setting-btn">Upload</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Edit Personal Information</h4>
                    <p>Update your contact details</p>
                  </div>
                  <button className="setting-btn">Edit</button>
                </div>
              </div>

              <div className="setting-group">
                <h3>Classroom Settings</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Class Schedule</h4>
                    <p>Manage your class timings</p>
                  </div>
                  <button className="setting-btn">Manage</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Grading Preferences</h4>
                    <p>Set up grading scales and policies</p>
                  </div>
                  <button className="setting-btn">Configure</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Attendance Settings</h4>
                    <p>Configure attendance tracking</p>
                  </div>
                  <button className="setting-btn">Setup</button>
                </div>
              </div>

              <div className="setting-group">
                <h3>Privacy & Security</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Privacy Settings</h4>
                    <p>Control who can see your profile</p>
                  </div>
                  <button className="setting-btn">Manage</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add extra security to your account</p>
                  </div>
                  <button className="setting-btn">Enable</button>
                </div>
              </div>
            </div>
          )}

          {profileTab === 'notifications' && (
            <div className="notifications-section">
              <div className="notification-group">
                <h3>Notification Preferences</h3>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Push Notifications</h4>
                    <p>Get instant app notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>SMS Notifications</h4>
                    <p>Receive text message alerts</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="notification-group">
                <h3>Specific Notifications</h3>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Class Updates</h4>
                    <p>When class schedules change</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.classUpdates}
                      onChange={() => handleNotificationChange('classUpdates')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Student Messages</h4>
                    <p>When students send messages</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.studentMessages}
                      onChange={() => handleNotificationChange('studentMessages')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Reminders</h4>
                    <p>Class and meeting reminders</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.reminders}
                      onChange={() => handleNotificationChange('reminders')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full z-20 bg-black/60 backdrop-blur-xl border-t border-white/10 flex justify-center transition-all duration-500">
          <div className="flex w-full max-w-md mx-auto">
            <button
              onClick={() => handleNav('dashboard')}
              className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'dashboard' ? 'text-indigo-400 scale-110' : 'text-gray-300 hover:text-white'}`}
            >
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => handleNav('students')}
              className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'students' ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white'}`}
            >
              <Users className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Students</span>
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'profile' ? 'text-pink-400 scale-110' : 'text-gray-300 hover:text-white'}`}
            >
              <User className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </nav>
      </div>

      <style>{`
        .profile-container {
          min-height: 100vh;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 1.5rem 1rem;
          padding-bottom: 6rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(0, 0, 0, 0.3);
          backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          margin-bottom: 1.5rem;
        }

        .profile-image-section {
          position: relative;
          flex-shrink: 0;
        }

        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #8b5cf6;
        }

        .profile-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #8b5cf6;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .profile-info {
          flex: 1;
        }

        .teacher-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .teacher-title {
          font-size: 1.1rem;
          color: #cbd5e1;
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        .teacher-email {
          color: #a855f7;
          margin: 0;
          font-weight: 500;
        }

        .profile-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.3);
          backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        .tab-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: rgba(139, 92, 246, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.5);
          color: white;
        }

        .profile-content {
          background: rgba(0, 0, 0, 0.3);
          backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        .info-section {
          margin-bottom: 2rem;
        }

        .info-section h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item label {
          font-size: 0.875rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .info-item span {
          color: white;
          font-weight: 500;
        }

        .subjects-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .subject-tag {
          background: rgba(139, 92, 246, 0.2);
          color: #a855f7;
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .bio-text {
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }

        .setting-group, .notification-group {
          margin-bottom: 2rem;
        }

        .setting-group h3, .notification-group h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .setting-item, .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .setting-item:last-child, .notification-item:last-child {
          border-bottom: none;
        }

        .setting-info, .notification-info {
          flex: 1;
        }

        .setting-info h4, .notification-info h4 {
          color: white;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }

        .setting-info p, .notification-info p {
          color: #cbd5e1;
          margin: 0;
          font-size: 0.875rem;
        }

        .setting-btn {
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .setting-btn:hover {
          background: #7c3aed;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.3);
          transition: 0.4s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: #8b5cf6;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: rgba(139, 92, 246, 0.3);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .logout-section {
          text-align: center;
          margin-top: 2rem;
        }

        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          .profile-tabs {
            flex-direction: column;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
