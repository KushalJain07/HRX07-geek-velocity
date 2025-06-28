import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  Bell, 
  Lock, 
  Globe, 
  Calendar,
  Clock,
  MapPin,
  Tag,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  EyeOff,
  Shield,
  UserPlus,
  GraduationCap,
  Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setClassrooms, getClassrooms } from './mockData';

const CreateClass: React.FC = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [studentCount, setStudentCount] = useState(25);
  const [description, setDescription] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced options state
  const [notifications, setNotifications] = useState(true);
  const [classType, setClassType] = useState('public'); // public, private, restricted
  const [allowStudentInvites, setAllowStudentInvites] = useState(false);
  const [autoAcceptStudents, setAutoAcceptStudents] = useState(true);
  const [classSchedule, setClassSchedule] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [classTags, setClassTags] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [academicYear, setAcademicYear] = useState('2024-2025');

  const backgroundOptions = [
    { id: 0, name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', preview: '#667eea' },
    { id: 1, name: 'Sunset Orange', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', preview: '#f093fb' },
    { id: 2, name: 'Forest Green', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', preview: '#4facfe' },
    { id: 3, name: 'Purple Dreams', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', preview: '#a8edea' },
    { id: 4, name: 'Warm Coral', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', preview: '#ff9a9e' },
    { id: 5, name: 'Sky Blue', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', preview: '#a1c4fd' },
    { id: 6, name: 'Golden Hour', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', preview: '#ffecd2' },
    { id: 7, name: 'Mint Fresh', gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', preview: '#a8e6cf' },
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 
    'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music', 'Physical Education'
  ];

  const gradeLevels = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleStudentCountChange = (increment: boolean) => {
    if (increment) {
      setStudentCount(prev => Math.min(prev + 1, 100));
    } else {
      setStudentCount(prev => Math.max(prev - 1, 1));
    }
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !subject.trim()) return;
    const classrooms = getClassrooms();
    const newClassroom = {
      id: Date.now(),
      title: className,
      subject,
      description,
      backgroundId: selectedBackground,
      backgroundGradient: backgroundOptions[selectedBackground].gradient,
      backgroundName: backgroundOptions[selectedBackground].name,
      studentCount,
      classType,
      gradeLevel,
      academicYear,
      classSchedule,
      classLocation,
      classTags
    };
    setClassrooms([...classrooms, newClassroom]);
    navigate('/dashboard');
  };

  const navigate = useNavigate();

  return (
    <>
    <div className="create-class-container">
        <button
          className="back-arrow-btn"
          onClick={() => navigate('/dashboard')}
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: '#6366f1',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="content">
          {/* Class Preview */}
          <div className="preview-section">
            <h3 className="section-title">Class Preview</h3>
            <div 
              className="class-preview-card"
              style={{ background: backgroundOptions[selectedBackground].gradient }}
            >
              <div className="preview-header">
                <div className="subject-badge">
                  <BookOpen size={14} />
                  <span>{subject || 'Subject'}</span>
                </div>
                <div className="visibility-indicator">
                  {classType === 'private' ? <Lock size={16} /> : 
                   classType === 'restricted' ? <Shield size={16} /> : <Globe size={16} />}
                </div>
              </div>
              
              <h3 className="preview-title">{className || 'Class Name'}</h3>
              
              <div className="preview-footer">
                <div className="students-info">
                  <Users size={16} />
                  <span>{studentCount} students</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-sections">
            <form onSubmit={handleCreateClass}>
              {/* Basic Information */}
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-group">
                  <label className="form-label">
                    <BookOpen size={16} />
                    Class Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter class name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <GraduationCap size={16} />
                    Subject *
                  </label>
                  <select
                    className="form-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Users size={16} />
                    Number of Students *
                  </label>
                  <div className="number-picker">
                    <button 
                      type="button"
                      className="number-btn"
                      onClick={() => handleStudentCountChange(false)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="number-display">{studentCount}</span>
                    <button 
                      type="button"
                      className="number-btn"
                      onClick={() => handleStudentCountChange(true)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FileText size={16} />
                    Description
                  </label>
                  <textarea
                    className="form-textarea"
                    placeholder="Enter class description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Background Selection */}
              <div className="form-section">
                <h3 className="section-title">
                  <Palette size={20} />
                  Choose Class Background
                </h3>
                <div className="background-grid">
                  {backgroundOptions.map((bg) => (
                    <div
                      key={bg.id}
                      className={`background-option ${selectedBackground === bg.id ? 'selected' : ''}`}
                      style={{ background: bg.gradient }}
                      onClick={() => setSelectedBackground(bg.id)}
                    >
                      <div className="background-name">{bg.name}</div>
                      {selectedBackground === bg.id && (
                        <div className="selected-indicator">
                          <div className="check-mark">✓</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div className="form-section">
                <button
                  className="advanced-toggle"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Settings size={16} />
                  Advanced Options
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showAdvanced && (
                  <div className="advanced-options">
                    {/* Class Visibility */}
                    <div className="form-group">
                      <label className="form-label">Class Visibility</label>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="classType"
                            value="public"
                            checked={classType === 'public'}
                            onChange={(e) => setClassType(e.target.value)}
                          />
                          <Globe size={16} />
                          <div>
                            <span className="radio-title">Public</span>
                            <span className="radio-description">Anyone can find and join</span>
                          </div>
                        </label>
                        
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="classType"
                            value="restricted"
                            checked={classType === 'restricted'}
                            onChange={(e) => setClassType(e.target.value)}
                          />
                          <Shield size={16} />
                          <div>
                            <span className="radio-title">Restricted</span>
                            <span className="radio-description">Requires approval to join</span>
                          </div>
                        </label>
                        
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="classType"
                            value="private"
                            checked={classType === 'private'}
                            onChange={(e) => setClassType(e.target.value)}
                          />
                          <Lock size={16} />
                          <div>
                            <span className="radio-title">Private</span>
                            <span className="radio-description">Invitation only</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="form-group">
                      <label className="form-label">Additional Settings</label>
                      <div className="checkbox-group">
                        <label className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                          />
                          <Bell size={16} />
                          <div>
                            <span className="checkbox-title">Enable Notifications</span>
                            <span className="checkbox-description">Send updates about class activities</span>
                          </div>
                        </label>

                        <label className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={allowStudentInvites}
                            onChange={(e) => setAllowStudentInvites(e.target.checked)}
                          />
                          <UserPlus size={16} />
                          <div>
                            <span className="checkbox-title">Allow Student Invites</span>
                            <span className="checkbox-description">Students can invite others</span>
                          </div>
                        </label>

                        <label className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={autoAcceptStudents}
                            onChange={(e) => setAutoAcceptStudents(e.target.checked)}
                          />
                          <Users size={16} />
                          <div>
                            <span className="checkbox-title">Auto-accept Students</span>
                            <span className="checkbox-description">Automatically accept join requests</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Class Details */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          <Tag size={16} />
                          Grade Level
                        </label>
                        <select
                          className="form-select"
                          value={gradeLevel}
                          onChange={(e) => setGradeLevel(e.target.value)}
                        >
                          <option value="">Select grade level</option>
                          {gradeLevels.map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <Calendar size={16} />
                          Academic Year
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="2024-2025"
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">
                          <Clock size={16} />
                          Class Schedule
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                          value={classSchedule}
                          onChange={(e) => setClassSchedule(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <MapPin size={16} />
                          Location
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Room 101, Building A"
                          value={classLocation}
                          onChange={(e) => setClassLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Tag size={16} />
                        Tags
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., advanced, beginner, exam-prep (comma separated)"
                        value={classTags}
                        onChange={(e) => setClassTags(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>Cancel</button>
                <button type="submit" className="create-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .create-class-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
        }

        .header {
          background: white;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .back-button {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .back-button:hover {
          background: #f1f5f9;
          color: #334155;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .save-draft-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          color: #64748b;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .save-draft-btn:hover {
          background: #e2e8f0;
          color: #475569;
        }

        .content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .preview-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .class-preview-card {
          border-radius: 1rem;
          padding: 1.5rem;
          color: white;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .subject-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .visibility-indicator {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .preview-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .preview-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .students-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .form-sections {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-section {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
          background: white;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .number-picker {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.5rem;
          width: fit-content;
        }

        .number-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.2s;
        }

        .number-btn:hover {
          background: #e2e8f0;
          color: #475569;
        }

        .number-display {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          min-width: 2rem;
          text-align: center;
        }

        .background-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .background-option {
          aspect-ratio: 16/9;
          border-radius: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: end;
          padding: 1rem;
          position: relative;
          transition: all 0.3s ease;
          border: 3px solid transparent;
        }

        .background-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .background-option.selected {
          border-color: #667eea;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .background-name {
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .selected-indicator {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .check-mark {
          color: #10b981;
          font-weight: bold;
          font-size: 0.875rem;
        }

        .advanced-toggle {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }

        .advanced-toggle:hover {
          background: #f1f5f9;
        }

        .advanced-options {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .radio-option:hover {
          border-color: #667eea;
          background: #f8fafc;
        }

        .radio-option input[type="radio"] {
          margin: 0;
        }

        .radio-title {
          font-weight: 500;
          color: #374151;
          display: block;
        }

        .radio-description {
          font-size: 0.875rem;
          color: #6b7280;
          display: block;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkbox-option:hover {
          border-color: #667eea;
          background: #f8fafc;
        }

        .checkbox-option input[type="checkbox"] {
          margin: 0;
        }

        .checkbox-title {
          font-weight: 500;
          color: #374151;
          display: block;
        }

        .checkbox-description {
          font-size: 0.875rem;
          color: #6b7280;
          display: block;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          color: #6b7280;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .cancel-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .create-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #667eea;
          border: none;
          border-radius: 0.5rem;
          color: white;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .create-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .content {
            padding: 1rem;
          }

          .form-section {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .background-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .action-buttons {
            flex-direction: column;
          }

          .cancel-btn, .create-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.25rem;
          }

          .background-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default CreateClass; 