import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassrooms, setClassrooms } from './mockData';
import { ArrowLeft, Settings, Copy, Check, Trash2, Users, Calendar, MapPin, Tag, GraduationCap, BookOpen, Upload, FileText, Plus, Video, Image, File } from 'lucide-react';

interface UploadedDocument {
  id: number;
  type: 'video' | 'pdf' | 'doc' | 'image' | 'other';
  title: string;
  details: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  classroomId: number;
}

const ClassroomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const classrooms = getClassrooms();
  const classroom = classrooms.find(c => c.id === Number(id));
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);

  // Generate random 8-digit hexadecimal code
  useEffect(() => {
    const generateCode = () => {
      const chars = '0123456789ABCDEF';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    setClassCode(generateCode());

    // Load uploaded documents for this classroom
    const allDocs = JSON.parse(localStorage.getItem('uploadedDocuments') || '[]');
    const classroomDocs = allDocs.filter((doc: UploadedDocument) => doc.classroomId === Number(id));
    setUploadedDocuments(classroomDocs);
  }, [id]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'doc': return FileText;
      case 'image': return Image;
      default: return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#ef4444';
      case 'pdf': return '#dc2626';
      case 'doc': return '#2563eb';
      case 'image': return '#059669';
      default: return '#7c3aed';
    }
  };

  const handleDelete = () => {
    const updated = classrooms.filter(c => c.id !== Number(id));
    setClassrooms(updated);
    navigate('/dashboard');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(classCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!classroom) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Classroom not found</h2>
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: 20, padding: '0.75rem 1.5rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="classroom-details-container">
      {/* Background Image with Title at Bottom */}
      <div 
        className="classroom-header"
        style={{ 
          background: classroom.backgroundGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Settings Icon - Top Right */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="settings-btn-top"
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>
        
        {showSettings && (
          <div className="settings-dropdown-top">
            <button className="settings-option">
              <Users size={16} />
              Manage Students
            </button>
            <button className="settings-option">
              <Calendar size={16} />
              Class Schedule
            </button>
            <button className="settings-option">
              <MapPin size={16} />
              Location Settings
            </button>
            <button className="settings-option">
              <Tag size={16} />
              Edit Details
            </button>
            <button 
              className="settings-option delete"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} />
              Delete Class
            </button>
          </div>
        )}

        {/* Back Button - Top Left */}
        <button
          onClick={() => navigate('/dashboard')}
          className="back-btn-top"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Title Section - Bottom */}
        <div className="title-section-bottom">
          <h1 className="classroom-title">{classroom.title}</h1>
          <div className="classroom-subtitle">
            <BookOpen size={16} />
            <span>{classroom.subject}</span>
          </div>
        </div>
      </div>

      {/* Description Section - Moved Up */}
      {classroom.description && (
        <div className="description-section-top">
          <h3>Description</h3>
          <p>{classroom.description}</p>
        </div>
      )}

      {/* Class Code Section */}
      <div className="class-code-section">
        <div className="code-container">
          <div className="code-info">
            <h3>Class Code</h3>
            <p>Share this code with students to join your class</p>
          </div>
          <div className="code-display">
            <span className="code-text">{classCode}</span>
            <button 
              onClick={copyToClipboard}
              className="copy-btn"
              aria-label="Copy class code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="documents-section">
        <div className="documents-header">
          <h3>My Documents</h3>
          <button 
            onClick={() => navigate(`/upload-document/${id}`)}
            className="upload-btn"
          >
            <Plus size={16} />
            Upload Document
          </button>
        </div>
        <div className="documents-grid">
          {uploadedDocuments.length > 0 ? (
            uploadedDocuments.map((doc) => {
              const IconComponent = getTypeIcon(doc.type);
              return (
                <div key={doc.id} className="document-card">
                  <div className="document-icon" style={{ backgroundColor: getTypeColor(doc.type) + '20', color: getTypeColor(doc.type) }}>
                    <IconComponent size={20} />
                  </div>
                  <div className="document-info">
                    <h4>{doc.title}</h4>
                    <p>{doc.details}</p>
                    <span className="document-meta">{doc.fileSize} • {new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <button className="document-download">
                    <Upload size={16} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="no-documents">
              <FileText size={48} />
              <h4>No documents uploaded yet</h4>
              <p>Upload your first document to get started</p>
              <button 
                onClick={() => navigate(`/upload-document/${id}`)}
                className="upload-first-btn"
              >
                <Plus size={16} />
                Upload First Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Class Details */}
      <div className="class-details">
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon">
              <Users size={20} />
            </div>
            <div className="detail-content">
              <h4>Students</h4>
              <p>{classroom.studentCount || 25} enrolled</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">
              <GraduationCap size={20} />
            </div>
            <div className="detail-content">
              <h4>Grade Level</h4>
              <p>{classroom.gradeLevel || 'Not specified'}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">
              <Calendar size={20} />
            </div>
            <div className="detail-content">
              <h4>Schedule</h4>
              <p>{classroom.classSchedule || 'Not scheduled'}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">
              <MapPin size={20} />
            </div>
            <div className="detail-content">
              <h4>Location</h4>
              <p>{classroom.classLocation || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {classroom.classTags && (
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags-list">
              {classroom.classTags.split(',').map((tag: string, index: number) => (
                <span key={index} className="tag">{tag.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Classroom</h3>
            <p>Are you sure you want to delete "{classroom.title}"? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn danger"
                onClick={handleDelete}
              >
                Delete Class
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .classroom-details-container {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .classroom-header {
          position: relative;
          min-height: 300px;
          padding: 2rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .settings-btn-top {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          backdrop-filter: blur(10px);
          transition: all 0.2s;
          z-index: 10;
        }

        .settings-btn-top:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .settings-dropdown-top {
          position: absolute;
          top: 5rem;
          right: 2rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          padding: 0.5rem;
          min-width: 200px;
          z-index: 1000;
        }

        .back-btn-top {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          backdrop-filter: blur(10px);
          transition: all 0.2s;
          z-index: 10;
        }

        .back-btn-top:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .title-section-bottom {
          margin-top: auto;
        }

        .classroom-title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .classroom-subtitle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .description-section-top {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .description-section-top h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
          font-weight: 600;
        }

        .description-section-top p {
          margin: 0;
          color: #4b5563;
          line-height: 1.6;
        }

        .settings-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          border-radius: 0.5rem;
          cursor: pointer;
          color: #374151;
          font-size: 0.875rem;
          transition: background 0.2s;
        }

        .settings-option:hover {
          background: #f3f4f6;
        }

        .settings-option.delete {
          color: #ef4444;
        }

        .settings-option.delete:hover {
          background: #fef2f2;
        }

        .class-code-section {
          padding: 1rem;
        }

        .code-container {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .code-info h3 {
          margin: 0 0 0.5rem 0;
          color: #1f2937;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .code-info p {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .code-display {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f8f9fa;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: 2px solid #e5e7eb;
        }

        .code-text {
          font-family: 'Courier New', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          letter-spacing: 2px;
        }

        .copy-btn {
          background: #667eea;
          color: white;
          border: none;
          border-radius: 0.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: #5a67d8;
          transform: scale(1.05);
        }

        .documents-section {
          padding: 1rem;
        }

        .documents-header {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .documents-header h3 {
          margin: 0;
          color: #1f2937;
          font-weight: 600;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #667eea;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .upload-btn:hover {
          background: #5a67d8;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .document-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .document-icon {
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .document-info {
          flex: 1;
        }

        .document-info h4 {
          margin: 0 0 0.25rem 0;
          color: #1f2937;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .document-info p {
          margin: 0 0 0.25rem 0;
          color: #6b7280;
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .document-meta {
          color: #9ca3af;
          font-size: 0.7rem;
        }

        .document-download {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.25rem;
          transition: background 0.2s;
        }

        .document-download:hover {
          background: #f3f4f6;
        }

        .no-documents {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          color: #6b7280;
        }

        .no-documents h4 {
          margin: 1rem 0 0.5rem 0;
          color: #374151;
          font-weight: 600;
        }

        .no-documents p {
          margin: 0 0 1.5rem 0;
        }

        .upload-first-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #667eea;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .upload-first-btn:hover {
          background: #5a67d8;
        }

        .class-details {
          padding: 1rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .detail-icon {
          background: #667eea;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-content h4 {
          margin: 0 0 0.25rem 0;
          color: #1f2937;
          font-weight: 600;
        }

        .detail-content p {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .tags-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }

        .tags-section h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
          font-weight: 600;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-content h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-content p {
          margin: 0 0 1.5rem 0;
          color: #6b7280;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .modal-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-btn.secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-btn.secondary:hover {
          background: #e5e7eb;
        }

        .modal-btn.danger {
          background: #ef4444;
          color: white;
        }

        .modal-btn.danger:hover {
          background: #dc2626;
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .classroom-header {
            min-height: 250px;
            padding: 1rem;
          }

          .classroom-title {
            font-size: 2rem;
          }

          .classroom-subtitle {
            font-size: 1rem;
          }

          .settings-btn-top, .back-btn-top {
            width: 40px;
            height: 40px;
            top: 1rem;
          }

          .settings-btn-top {
            right: 1rem;
          }

          .back-btn-top {
            left: 1rem;
          }

          .settings-dropdown-top {
            top: 4rem;
            right: 1rem;
            min-width: 180px;
          }

          .code-container {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .code-text {
            font-size: 1.25rem;
          }

          .documents-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .documents-grid {
            grid-template-columns: 1fr;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .description-section-top,
          .class-code-section,
          .documents-section,
          .class-details {
            margin: 0.5rem;
            padding: 0.5rem;
          }

          .code-container,
          .documents-header,
          .detail-card,
          .tags-section {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .classroom-title {
            font-size: 1.75rem;
          }

          .classroom-subtitle {
            font-size: 0.875rem;
          }

          .code-text {
            font-size: 1rem;
            letter-spacing: 1px;
          }

          .document-card {
            padding: 0.75rem;
          }

          .detail-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClassroomDetails; 