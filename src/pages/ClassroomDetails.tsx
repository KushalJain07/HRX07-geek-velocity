import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassrooms, setClassrooms } from "./mockData";
import {
  ArrowLeft,
  Settings,
  Copy,
  Check,
  Trash2,
  Users,
  Calendar,
  MapPin,
  Tag,
  GraduationCap,
  BookOpen,
  Plus,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Mission {
  id: number;
  title: string;
  type: string;
  typeSubOption: string;
  typeValue: string;
  rewardType: string;
  rewardValue: string;
  classroomId: number;
  createdAt: string;
}

const ClassroomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const classrooms = getClassrooms();
  const classroom = classrooms.find((c) => c.id === Number(id));
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [showCreateMission, setShowCreateMission] = useState(false);
  const [showViewMissions, setShowViewMissions] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Create Mission form state
  const [missionTitle, setMissionTitle] = useState("");
  const [missionType, setMissionType] = useState("");
  const [quizzesCount, setQuizzesCount] = useState("");
  const [videosCount, setVideosCount] = useState("");
  const [watchTime, setWatchTime] = useState("");
  const [rewardType, setRewardType] = useState("");
  const [rewardValue, setRewardValue] = useState("");

  // Load persistent class code and missions
  useEffect(() => {
    // Load or generate persistent class code
    const storedClassCode = localStorage.getItem(`classCode_${id}`);
    if (storedClassCode) {
      setClassCode(storedClassCode);
    } else {
      const generateCode = () => {
        const chars = "0123456789ABCDEF";
        let result = "";
        for (let i = 0; i < 8; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      const newCode = generateCode();
      setClassCode(newCode);
      localStorage.setItem(`classCode_${id}`, newCode);
    }

    // Load persistent missions
    const storedMissions = localStorage.getItem(`missions_${id}`);
    if (storedMissions) {
      try {
        const parsedMissions = JSON.parse(storedMissions);
        setMissions(Array.isArray(parsedMissions) ? parsedMissions : []);
      } catch {
        setMissions([]);
        localStorage.removeItem(`missions_${id}`);
      }
    } else {
      setMissions([]);
    }

    // Mark as initialized after loading data
    setIsInitialized(true);
  }, [id]);

  // Save missions to localStorage whenever missions state changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      if (missions.length > 0) {
        localStorage.setItem(`missions_${id}`, JSON.stringify(missions));
      } else {
        localStorage.removeItem(`missions_${id}`);
      }
    }
  }, [missions, id, isInitialized]);

  const handleDelete = () => {
    const updated = classrooms.filter((c) => c.id !== Number(id));
    setClassrooms(updated);
    // Clean up persistent data when class is deleted
    localStorage.removeItem(`classCode_${id}`);
    localStorage.removeItem(`missions_${id}`);
    navigate("/dashboard");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(classCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const createMission = () => {
    const hasValidTypeValue =
      (missionType === "quizzes" && quizzesCount.trim()) ||
      (missionType === "videos" && videosCount.trim()) ||
      (missionType === "watchtime" && watchTime.trim());

    if (
      !missionTitle.trim() ||
      !missionType.trim() ||
      !hasValidTypeValue ||
      !rewardType.trim() ||
      !rewardValue.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newMission: Mission = {
      id: Date.now(),
      title: missionTitle,
      type: missionType,
      typeSubOption: missionType,
      typeValue:
        missionType === "quizzes"
          ? quizzesCount
          : missionType === "videos"
          ? videosCount
          : watchTime,
      rewardType: rewardType,
      rewardValue: rewardValue,
      classroomId: Number(id),
      createdAt: new Date().toISOString(),
    };
    const updatedMissions = [...missions, newMission];
    setMissions(updatedMissions);

    // Reset form and close dropdown
    setMissionTitle("");
    setMissionType("");
    setQuizzesCount("");
    setVideosCount("");
    setWatchTime("");
    setRewardType("");
    setRewardValue("");
    setShowCreateMission(false);
  };

  // Reset sub-options when mission type changes
  const handleMissionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMissionType(e.target.value);
    // Reset all type values when changing mission type
    setQuizzesCount("");
    setVideosCount("");
    setWatchTime("");
  };

  // Get reward options
  const getRewardOptions = () => {
    return [{ value: "scholar_stones", label: "Scholar Stones" }];
  };

  const deleteMission = (missionId: number) => {
    const updatedMissions = missions.filter(
      (mission) => mission.id !== missionId
    );
    setMissions(updatedMissions);
    setSelectedMission(null);
  };

  const viewMissions = () => {
    setShowViewMissions(!showViewMissions);
    setShowCreateMission(false);
  };

  const toggleCreateMission = () => {
    setShowCreateMission(!showCreateMission);
    setShowViewMissions(false);
  };

  if (!classroom) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Classroom not found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: 20,
            padding: "0.75rem 1.5rem",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="classroom-details-container">
      {/* Background Image with Title at Bottom */}
      <div
        className="classroom-header"
        style={{
          background:
            classroom.backgroundGradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          onClick={() => navigate("/dashboard")}
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
              <h4>Missions</h4>
              <p>{missions.length} created</p>
            </div>
          </div>
        </div>

        {/* Update Missions Section */}
        <div className="update-missions-section">
          <h3>Update Missions</h3>
          <div className="missions-actions">
            <button
              onClick={toggleCreateMission}
              className="mission-action-btn create"
            >
              <Plus size={16} />
              Create Mission
              {showCreateMission ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            <button
              onClick={viewMissions}
              className={`mission-action-btn view ${
                missions.length === 0 ? "disabled" : ""
              }`}
              disabled={missions.length === 0}
            >
              <Eye size={16} />
              View Missions
              {showViewMissions ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>

          {/* Create Mission Dropdown */}
          {showCreateMission && (
            <div className="mission-dropdown create-dropdown">
              <div className="dropdown-header">
                <h4>Create New Mission</h4>
                <button
                  onClick={() => setShowCreateMission(false)}
                  className="close-btn"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="form-fields">
                <div className="form-group">
                  <label>Mission Title</label>
                  <input
                    type="text"
                    value={missionTitle}
                    onChange={(e) => setMissionTitle(e.target.value)}
                    placeholder="Enter mission title"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Mission Type</label>
                  <select
                    value={missionType}
                    onChange={handleMissionTypeChange}
                    className="form-input"
                  >
                    <option value="">Select mission type</option>
                    <option value="quizzes">No. of Quizzes to Complete</option>
                    <option value="videos">No. of Videos to Watch</option>
                    <option value="watchtime">Watch Time</option>
                  </select>
                </div>
                {missionType && (
                  <div className="form-group">
                    <label>
                      {missionType === "quizzes" && "Number of Quizzes"}
                      {missionType === "videos" && "Number of Videos"}
                      {missionType === "watchtime" && "Watch Time Duration"}
                    </label>
                    {missionType === "watchtime" ? (
                      <input
                        type="time"
                        value={watchTime}
                        onChange={(e) => setWatchTime(e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <input
                        type="number"
                        value={
                          missionType === "quizzes" ? quizzesCount : videosCount
                        }
                        onChange={(e) => {
                          if (missionType === "quizzes") {
                            setQuizzesCount(e.target.value);
                          } else {
                            setVideosCount(e.target.value);
                          }
                        }}
                        placeholder={
                          missionType === "quizzes"
                            ? "Enter number of quizzes"
                            : "Enter number of videos"
                        }
                        className="form-input"
                        min="0"
                      />
                    )}
                  </div>
                )}
                <div className="form-group">
                  <label>Reward Type</label>
                  <select
                    value={rewardType}
                    onChange={(e) => setRewardType(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select reward type</option>
                    {getRewardOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {rewardType && (
                  <div className="form-group">
                    <label>Reward Value</label>
                    <input
                      type="text"
                      value={rewardValue}
                      onChange={(e) => setRewardValue(e.target.value)}
                      placeholder="Enter reward value"
                      className="form-input"
                    />
                  </div>
                )}
                <button onClick={createMission} className="submit-btn">
                  Create Mission
                </button>
              </div>
            </div>
          )}

          {/* View Missions Dropdown */}
          {showViewMissions && (
            <div className="mission-dropdown view-dropdown">
              <div className="dropdown-header">
                <h4>View Missions</h4>
                <button
                  onClick={() => setShowViewMissions(false)}
                  className="close-btn"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="missions-list">
                {missions.length === 0 ? (
                  <div className="no-missions">
                    <p>No missions created yet</p>
                  </div>
                ) : (
                  missions.map((mission) => (
                    <div key={mission.id} className="mission-item">
                      <div
                        className="mission-title"
                        onClick={() =>
                          setSelectedMission(
                            selectedMission?.id === mission.id ? null : mission
                          )
                        }
                      >
                        <span>{mission.title}</span>
                        <div className="mission-actions">
                          {selectedMission?.id === mission.id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMission(mission.id);
                            }}
                            className="delete-mission-btn"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {selectedMission?.id === mission.id && (
                        <div className="mission-details">
                          <div className="detail-row">
                            <strong>Type:</strong> {mission.type}
                          </div>
                          <div className="detail-row">
                            <strong>Type Details:</strong>{" "}
                            {mission.typeSubOption} - {mission.typeValue}
                          </div>
                          <div className="detail-row">
                            <strong>Reward:</strong> {mission.rewardType} -{" "}
                            {mission.rewardValue}
                          </div>
                          <div className="detail-row">
                            <strong>Created:</strong>{" "}
                            {new Date(mission.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {classroom.classTags && (
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags-list">
              {classroom.classTags
                .split(",")
                .map((tag: string, index: number) => (
                  <span key={index} className="tag">
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Classroom</h3>
            <p>
              Are you sure you want to delete "{classroom.title}"? This action
              cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button className="modal-btn danger" onClick={handleDelete}>
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

        .update-missions-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }

        .update-missions-section h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
          font-weight: 600;
        }

        .missions-actions {
          display: flex;
          gap: 1rem;
        }

        .mission-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          flex: 1;
        }

        .mission-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .mission-action-btn.create {
          background: #10b981;
          color: white;
        }

        .mission-action-btn.create:hover {
          background: #059669;
        }

        .mission-action-btn.view {
          background: #667eea;
          color: white;
        }

        .mission-action-btn.view:hover {
          background: #5a67d8;
        }

        .mission-action-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #9ca3af;
        }

        .mission-action-btn.disabled:hover {
          background: #9ca3af;
          transform: none;
        }

        /* Mission Dropdowns */
        .mission-dropdown {
          margin-top: 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .dropdown-header h4 {
          margin: 0;
          color: #1f2937;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        /* Create Mission Form */
        .form-fields {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #374151;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 0.75rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        /* View Missions List */
        .missions-list {
          padding: 1.5rem;
        }

        .no-missions {
          text-align: center;
          color: #6b7280;
          padding: 2rem;
        }

        .mission-item {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
          overflow: hidden;
          transition: all 0.2s;
        }

        .mission-item:hover {
          border-color: #667eea;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
        }

        .mission-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          cursor: pointer;
          transition: background 0.2s;
        }

        .mission-title:hover {
          background: #f1f5f9;
        }

        .mission-title span {
          font-weight: 500;
          color: #1f2937;
        }

        .mission-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .delete-mission-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 0.25rem;
          padding: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-mission-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .mission-details {
          padding: 1rem;
          background: white;
          border-top: 1px solid #e5e7eb;
          animation: slideDown 0.2s ease-out;
        }

        .detail-row {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-row strong {
          color: #1f2937;
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

          .details-grid {
            grid-template-columns: 1fr;
          }

          .description-section-top,
          .class-code-section,
          .class-details {
            margin: 0.5rem;
            padding: 0.5rem;
          }

          .code-container,
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

          .detail-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClassroomDetails;
