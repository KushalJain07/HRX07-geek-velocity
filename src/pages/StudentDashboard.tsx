import React, { useState, useEffect } from 'react';
import { Users, LogOut, User, PlusCircle, BookOpen, Sparkles, Home, BarChart3, Calendar, Search, Bell, Star, Zap, Rocket, Shield, Crown, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addQuestsForNewClass } from './mockData';

const mockClasses = [
  { id: 1, title: 'Compiler Design', subject: 'Compiler Design', teacher: 'Ms. Nova', color: 'from-emerald-400 to-teal-500', students: 28, icon: Star, completed: true },
  // { id: 2, title: 'Quantum Physics', subject: 'Physics', teacher: 'Dr. Quark', color: 'from-cyan-400 to-blue-500', students: 24, icon: Zap, completed: false },
  // { id: 3, title: 'Stellar History', subject: 'History', teacher: 'Mr. Chronos', color: 'from-purple-400 to-pink-500', students: 32, icon: Crown, completed: false },
  // { id: 4, title: 'DBMS', subject: 'Engineering', teacher: 'Dr. Cosmos', color: 'from-orange-400 to-red-500', students: 19, icon: Rocket, completed: false },
];

const mockProfile = {
  name: 'Alex Starborn',
  email: 'alex.starborn@student.edu',
  avatar: '/pet.png',
  bio: 'Aspiring cosmic explorer. Loves quests, pets, and learning new things! 🚀',
  rank: 'Space Cadet',
  level: 15,
  xp: 2850,
  nextLevelXp: 3000
};

const mockStats = {
  totalQuests: 47,
  completedQuests: 35,
  activeClasses: 3,
  rank: 'Space Cadet'
};

const mockNotifications = [
  { id: 1, message: 'New quest available in Galactic Math!', time: '2 min ago', type: 'quest' },
  { id: 2, message: 'You earned 50 XP for completing "Stellar Genesis"', time: '1 hour ago', type: 'xp' },
  { id: 3, message: 'Your pet has evolved to level 2!', time: '3 hours ago', type: 'pet' },
  { id: 4, message: 'New class "Quantum Physics" is now available', time: '1 day ago', type: 'class' },
  { id: 5, message: 'Daily bonus claimed! +20 Scolar Stones', time: '2 hours ago', type: 'bonus' },
  { id: 6, message: 'Completed "Nebula Navigation" quest', time: '3 hours ago', type: 'quest' },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'join' | 'inventory'>('dashboard');
  const [joinedClasses, setJoinedClasses] = useState(mockClasses);
  const [classCode, setClassCode] = useState('');
  const [profile, setProfile] = useState(mockProfile);
  const [editBio, setEditBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [showNotifications, setShowNotifications] = useState(false);
  const [soulStones, setSoulStones] = useState(125);
  const navigate = useNavigate();

  const handleJoinClass = () => {
    if (classCode.trim()) {
      const newClassId = Date.now();
      const icons = [Shield, Rocket, Star, Zap];
      const colors = ['from-indigo-400 to-purple-500', 'from-pink-400 to-rose-500', 'from-green-400 to-emerald-500'];
      addQuestsForNewClass(newClassId.toString());
      setJoinedClasses([
        ...joinedClasses,
        {
          id: newClassId,
          title: `Mystery Class (${classCode})`,
          subject: 'Unknown',
          teacher: 'TBD',
          color: colors[Math.floor(Math.random() * colors.length)],
          students: Math.floor(Math.random() * 30) + 10,
          icon: icons[Math.floor(Math.random() * icons.length)],
          completed: false,
        },
      ]);
      setClassCode('');
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleClassClick = (classId: number) => {
    navigate(`/level-map/${classId}`);
  };

  const completedClasses = joinedClasses.filter(cls => cls.completed).length;
  const unreadNotifications = mockNotifications.filter(n => n.type === 'quest' || n.type === 'xp' || n.type === 'bonus').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative pb-24">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-cyan-400 mr-3 animate-pulse" />
              <div>
                <h1 className="text-xl font-bold text-white">Cosmic Dashboard</h1>
                <p className="text-sm text-cyan-200">Your space learning hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Scolar Stones Display */}
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                <span className="text-yellow-400 text-lg">💎</span>
                <span className="text-white font-semibold">{soulStones}</span>
                <span className="text-gray-300 text-sm">Scolar Stones</span>
              </div>
              
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search galaxies..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64 text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <Bell 
                  className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" 
                  onClick={() => setShowNotifications(!showNotifications)}
                />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-16 right-4 w-80 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-50">
                  <div className="p-3 border-b border-white/10">
                    <h3 className="text-white font-semibold text-sm">Recent Activities</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'quest' ? 'bg-cyan-400' :
                            notification.type === 'xp' ? 'bg-green-400' :
                            notification.type === 'pet' ? 'bg-purple-400' :
                            notification.type === 'bonus' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm leading-relaxed">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Classes Section */}
            <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">My Classes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedClasses.map((cls) => {
                  const IconComponent = cls.icon;
                  return (
                    <div
                      key={cls.id}
                      className={`group cursor-pointer bg-gradient-to-br ${cls.color} rounded-2xl p-6 shadow-xl border-2 ${cls.completed ? 'border-emerald-400' : 'border-white/20'} transition-transform hover:scale-105 flex flex-col justify-between min-h-[180px]`}
                      onClick={() => handleClassClick(cls.id)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-black/30 flex items-center justify-center border border-white/20">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-white">{cls.title}</div>
                          <div className="text-cyan-200 text-sm">{cls.subject}</div>
                          <div className="text-gray-300 text-xs">{cls.teacher}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="bg-black/30 text-white text-xs px-3 py-1 rounded-full border border-white/10">{cls.students} students</span>
                        {cls.completed && (
                          <span className="bg-emerald-400 text-white text-xs px-2 py-1 rounded-full ml-2">Completed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Join Class Content */}
        {activeTab === 'join' && (
          <div className="max-w-md mx-auto">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mb-4 border border-purple-400/30">
                  <PlusCircle className="h-8 w-8 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Join a New Mission</h2>
                <p className="text-gray-300">Enter the cosmic code provided by your commander</p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter mission code..."
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg text-white placeholder-gray-400 backdrop-blur-sm"
                />
                <button
                  onClick={handleJoinClass}
                  disabled={!classCode.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg"
                >
                  Launch Mission
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-4 border-2 border-white/30">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                <p className="text-gray-300">{profile.email}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-400/30">
                    Level {profile.level}
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30">
                    {profile.rank}
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-400/30 flex items-center gap-1">
                    <span>💎</span>
                    <span>{soulStones} Scolar Stones</span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* XP Progress */}
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Experience Points</span>
                    <span>{profile.xp} / {profile.nextLevelXp} XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Bio Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  {editBio ? (
                    <div className="space-y-3">
                      <textarea
                        value={bioInput}
                        onChange={(e) => setBioInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setProfile({ ...profile, bio: bioInput });
                            setEditBio(false);
                          }}
                          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setBioInput(profile.bio);
                            setEditBio(false);
                          }}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                      <span className="text-gray-200">{profile.bio}</span>
                      <button
                        onClick={() => setEditBio(true)}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{joinedClasses.length}</div>
                    <div className="text-gray-300 text-sm">Classes Joined</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{completedClasses}</div>
                    <div className="text-gray-300 text-sm">Completed</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{mockStats.totalQuests}</div>
                    <div className="text-gray-300 text-sm">Total Quests</div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Content */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Pet Display */}
            <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">My Pet</h2>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-4xl">
                  🐉
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Cosmic Dragon</h3>
                  <p className="text-gray-300 text-sm">Level 5 - Legendary</p>
                  <p className="text-cyan-200 text-sm">Health: 85/100</p>
                </div>
              </div>
            </div>

            {/* Marketplace Button */}
            <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Marketplace</h2>
              <p className="text-gray-300 mb-4">Buy items, pets, and upgrades with your Scolar Stones</p>
              <button 
                onClick={() => navigate('/marketplace')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
              >
                Visit Marketplace
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-20 bg-black/60 backdrop-blur-xl border-t border-white/10 flex justify-center transition-all duration-500">
        <div className="flex w-full max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'dashboard' ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white'}`}
          >
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Command Center</span>
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'join' ? 'text-purple-400 scale-110' : 'text-gray-300 hover:text-white'}`}
          >
            <PlusCircle className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Join Mission</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'inventory' ? 'text-green-400 scale-110' : 'text-gray-300 hover:text-white'}`}
          >
            <Package className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex flex-col items-center py-3 transition-all ${activeTab === 'profile' ? 'text-pink-400 scale-110' : 'text-gray-300 hover:text-white'}`}
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}