import React, { useState } from 'react';
import { Search, Users, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { students } from './mockData';
import { TextShimmer } from '@/components/ui/text-shimmer';

const StudentCard: React.FC<{ student: any }> = ({ student }) => (
  <div className="student-card">
    <div className="student-avatar">
      {student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
    </div>
    <div className="student-info">
      <h3 className="student-name">{student.name}</h3>
      <p className="student-email">{student.email}</p>
      <div className="student-status-container">
        <span className={`status-badge status-${student.status}`}>
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      </div>
    </div>
  </div>
);

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'profile'>('students');
  const navigate = useNavigate();

  const handleNav = (tab: 'dashboard' | 'students' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/dashboard');
    if (tab === 'students') navigate('/students');
    if (tab === 'profile') navigate('/profile');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
      <div className="relative z-10 dashboard-container">
        <div className="main-content">
          <h2 className="welcome-title">
            <Users size={24} style={{ color: '#6366f1' }} />
            <TextShimmer
              duration={1.2}
              className="[--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
              as="span"
            >
              Students
            </TextShimmer>
          </h2>
          <p className="welcome-subtitle">
            Manage and track your students. Search to find specific students.
          </p>

          {/* Search */}
          <div className="search-filter-container">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search students..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </button>
            <button
              className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>

          <div className="students-count">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
          </div>

          {filteredStudents.length > 0 ? (
            viewMode === 'cards' ? (
              <div className="students-list">
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            ) : (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: 500 }}>{student.name}</td>
                      <td style={{ color: '#6b7280' }}>{student.email}</td>
                      <td>
                        <span className={`status-badge status-${student.status}`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            <div className="no-students">
              <div className="no-students-icon">👥</div>
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
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
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .main-content {
          padding: 1.5rem 1rem;
          padding-bottom: 6rem;
        }
        .welcome-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .welcome-subtitle {
          color: #cbd5e1;
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
        }
        .search-filter-container {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .search-container {
          position: relative;
          flex: 1;
        }
        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          backdrop-blur-sm;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #8b5cf6;
        }
        .search-input::placeholder {
          color: #cbd5e1;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #cbd5e1;
        }
        .view-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .view-button {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
          backdrop-blur-sm;
        }
        .view-button.active {
          border-color: #8b5cf6;
          background-color: rgba(139, 92, 246, 0.3);
          color: white;
        }
        .students-count {
          margin-bottom: 1rem;
          color: #cbd5e1;
          font-size: 0.875rem;
        }
        .students-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .student-card {
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          transition: all 0.2s;
          cursor: pointer;
        }
        .student-card:hover {
          box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.4);
          transform: translateY(-1px);
        }
        .student-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .student-info {
          flex: 1;
          min-width: 0;
        }
        .student-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin: 0 0 0.25rem 0;
        }
        .student-email {
          color: #cbd5e1;
          font-size: 0.875rem;
          margin: 0 0 0.5rem 0;
        }
        .student-status-container {
          display: flex;
          align-items: center;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .status-active {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .status-pending {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }
        .status-inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .students-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(0, 0, 0, 0.3);
          backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        .students-table thead {
          background: rgba(0, 0, 0, 0.4);
          text-align: left;
        }
        .students-table th {
          padding: 12px 16px;
          font-weight: 600;
          color: white;
        }
        .students-table td {
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
        }
        .students-table tr:last-child td {
          border-bottom: none;
        }
        .no-students {
          text-align: center;
          padding: 3rem 1rem;
          color: #cbd5e1;
        }
        .no-students-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 640px) {
          .search-filter-container {
            flex-direction: column;
            gap: 0.75rem;
          }
          .search-container {
            width: 100%;
          }
          .students-table {
            font-size: 0.875rem;
          }
          .students-table th,
          .students-table td {
            padding: 8px 12px;
          }
        }
        @media (max-width: 480px) {
          .welcome-title {
            font-size: 1.25rem;
          }
          .student-card {
            padding: 0.75rem;
          }
          .student-avatar {
            width: 45px;
            height: 45px;
            font-size: 0.875rem;
          }
          .student-name {
            font-size: 1rem;
          }
          .students-table {
            display: none;
          }
          .view-toggle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Students;