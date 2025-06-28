import React, { useEffect, useState } from 'react';
import { Search, Plus, Users, BookOpen, Calendar, BarChart3, Sparkles, GraduationCap, User, LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getClassrooms } from './mockData';

interface ClassroomCardProps {
  title: string;
  subject: string;
  gradientClass?: string;
}

const ClassroomCard: React.FC<ClassroomCardProps & { onClick?: () => void }> = ({ 
  title, 
  subject, 
  gradientClass, 
  onClick 
}) => (
  <div className={`classroom-card ${gradientClass || 'gradient-blue-purple'}`} onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="card-header">
      <div className="subject-badge">
        <BookOpen size={14} />
        <span className="card-text-shadow">{subject}</span>
      </div>
    </div>
    <h3 className="classroom-title card-text-shadow">{title}</h3>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="stat-card">
    <div className={`stat-icon ${color}`}>
      <Icon size={24} />
    </div>
    <div className="stat-content">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<Array<{id: number, date: string, title: string, type: string}>>([
    { id: 1, date: '2024-01-15', title: 'Math Class', type: 'class' },
    { id: 2, date: '2024-01-17', title: 'Science Lab', type: 'class' },
    { id: 3, date: '2024-01-20', title: 'Parent Meeting', type: 'meeting' },
    { id: 4, date: '2024-01-25', title: 'Exam Week', type: 'exam' },
  ]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'classes' | 'students' | 'profile'>('dashboard');

  useEffect(() => {
    setClassrooms(getClassrooms());
  }, []);

  const gradientClasses = [
    'gradient-blue-purple',
    'gradient-pink-orange',
    'gradient-green-blue',
    'gradient-purple-pink',
    'gradient-orange-red',
    'gradient-teal-blue'
  ];

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const addEvent = (title: string, type: string) => {
    if (selectedDate) {
      const newEvent = {
        id: Date.now(),
        date: formatDate(selectedDate),
        title,
        type
      };
      setEvents([...events, newEvent]);
      setShowAddEvent(false);
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleNav = (tab: 'dashboard' | 'classes' | 'students' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/dashboard');
    if (tab === 'classes') navigate('/dashboard'); // Or a dedicated classes page if exists
    if (tab === 'students') navigate('/students');
    if (tab === 'profile') navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated/Glassmorphism Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

      {/* Sticky Glassy Header */}
      <header className="sticky top-0 z-20 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <GraduationCap className="h-10 w-10 text-indigo-300 animate-pulse" />
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />
                Dashboard
              </h1>
              <p className="text-sm text-indigo-200">Your teaching hub</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search classrooms..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 text-white placeholder-gray-400 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Profile Avatar & Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all">
                <User className="h-6 w-6" />
                <span className="hidden sm:inline">Teacher</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-black/80 rounded-xl shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
                <button className="w-full text-left px-4 py-3 hover:bg-white/10 text-white">Profile</button>
                <button className="w-full text-left px-4 py-3 hover:bg-white/10 text-white">Settings</button>
                <button className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-red-300 flex items-center gap-2"><LogOut className="h-4 w-4" />Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What's New in Learn Arena 🚀</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-indigo-200"><span className="w-2 h-2 bg-pink-400 rounded-full"></span> New AI-powered assignment grading system</li>
              <li className="flex items-center gap-2 text-indigo-200"><span className="w-2 h-2 bg-pink-400 rounded-full"></span> Enhanced student progress analytics dashboard</li>
              <li className="flex items-center gap-2 text-indigo-200"><span className="w-2 h-2 bg-pink-400 rounded-full"></span> Interactive whiteboard tools for virtual classes</li>
              <li className="flex items-center gap-2 text-indigo-200"><span className="w-2 h-2 bg-pink-400 rounded-full"></span> Automated parent-teacher communication system</li>
            </ul>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <Sparkles className="h-24 w-24 text-pink-400 animate-pulse" />
          </div>
        </section>

        {/* Stats & Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 flex flex-col items-center shadow-xl">
            <Users className="h-10 w-10 text-cyan-400 mb-2 animate-pulse" />
            <div className="text-3xl font-bold text-white">154</div>
            <div className="text-indigo-200">Total Students</div>
          </div>
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 flex flex-col items-center shadow-xl">
            <BookOpen className="h-10 w-10 text-purple-400 mb-2 animate-pulse" />
            <div className="text-3xl font-bold text-white">{classrooms.length}</div>
            <div className="text-indigo-200">Active Classes</div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <button onClick={() => navigate('/create-class')} className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg transition-all">
              <Plus className="inline-block mr-2" /> New Class
            </button>
            <button onClick={() => setShowCalendar(true)} className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg transition-all">
              <Calendar className="inline-block mr-2" /> Schedule
            </button>
            <button className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg transition-all">
              <BarChart3 className="inline-block mr-2" /> Analytics
            </button>
          </div>
        </section>

        {/* Classrooms Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Your Classrooms</h3>
            <span className="bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-lg font-semibold border border-indigo-400/30">{filteredClassrooms.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredClassrooms.map((classroom, index) => (
              <div
                key={classroom.id}
                className={`group cursor-pointer bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl border-2 border-white/20 transition-transform hover:scale-105 flex flex-col justify-between min-h-[180px] relative overflow-hidden`}
                onClick={() => navigate(`/classroom/${classroom.id}`)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-black/30 flex items-center justify-center border border-white/20">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{classroom.title}</div>
                    <div className="text-cyan-200 text-sm">{classroom.subject}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="bg-black/30 text-white text-xs px-3 py-1 rounded-full border border-white/10">{classroom.studentCount || 0} students</span>
                  <button className="ml-2 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all">View</button>
                </div>
                {/* Animated Glow */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl group-hover:opacity-80 opacity-40 transition-all animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar (like student dashboard) */}
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

      {/* Calendar Modal (modern glassy) */}
      {showCalendar && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCalendar(false)}>
          <div className="bg-black/90 border border-indigo-500/30 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button className="text-2xl text-indigo-300 hover:text-white" onClick={prevMonth}>‹</button>
                <h3 className="text-xl font-bold text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <button className="text-2xl text-indigo-300 hover:text-white" onClick={nextMonth}>›</button>
              </div>
              <button className="text-white text-2xl hover:text-pink-400" onClick={() => setShowCalendar(false)}>×</button>
            </div>
            <div className="flex gap-2 mb-4">
              <button className="bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-500/40 transition-all" onClick={() => setShowAddEvent(true)}><Plus className="inline-block mr-1" size={16}/>Add Event</button>
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"><Calendar className="inline-block mr-1" size={16}/>View Tasks</button>
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"><Users className="inline-block mr-1" size={16}/>Meetings</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-indigo-200 py-2">{day}</div>
              ))}
              {getDaysInMonth(currentDate).map((date, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-2 min-h-[60px] flex flex-col items-center justify-start cursor-pointer border border-white/10 transition-all ${date ? 'bg-white/5 hover:bg-indigo-500/10' : 'bg-transparent'} ${selectedDate && date && formatDate(date) === formatDate(selectedDate) ? 'bg-indigo-500/20 border-indigo-400/30' : ''}`}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <span className="font-bold text-white text-sm">{date.getDate()}</span>
                      {getEventsForDate(date).map(event => (
                        <div key={event.id} className={`mt-1 px-2 py-1 rounded text-xs text-white ${event.type === 'class' ? 'bg-cyan-500/60' : event.type === 'meeting' ? 'bg-pink-500/60' : event.type === 'exam' ? 'bg-yellow-500/60' : 'bg-purple-500/60'}`}>{event.title}</div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && selectedDate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddEvent(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Event for {selectedDate.toDateString()}</h3>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Event title" id="eventTitle" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <select id="eventType" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="class">Class</option>
                <option value="meeting">Meeting</option>
                <option value="exam">Exam</option>
                <option value="task">Task</option>
              </select>
              <div className="flex gap-2 justify-end mt-4">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all" onClick={() => setShowAddEvent(false)}>Cancel</button>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all" onClick={() => {
                  const title = (document.getElementById('eventTitle') as HTMLInputElement)?.value;
                  const type = (document.getElementById('eventType') as HTMLSelectElement)?.value;
                  if (title) addEvent(title, type);
                }}>Add Event</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;