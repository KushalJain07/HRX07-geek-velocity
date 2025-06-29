import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClassroomDetails from './pages/ClassroomDetails';
import CreateClass from './pages/CreateClass';
import Students from './pages/Students';
import Profile from './pages/Profile';
import UploadDocument from './pages/UploadDocument';
import EnterCodeScreen from './screens/student/BeginScreen.tsx';
import OptimizedCosmicMap from './screens/student/LevelMapScreen.tsx';
import QuestDetailScreen from './screens/student/QuestDetailScreen.jsx';
import GamifiedQuizScreen from './screens/student/QuizScreen.jsx';
import PetSelector from './screens/student/PetSelector.tsx';
import Onboarding from './screens/student/Onboarding.jsx';
import EdumonApp from './screens/student/Edumon.tsx';
import StudentDashboard from './pages/StudentDashboard';
import Marketplace from './pages/Marketplace';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Type assertions for JSX files
const OnboardingComponent = Onboarding as React.ComponentType;
const QuestDetailComponent = QuestDetailScreen as React.ComponentType;
const QuizComponent = GamifiedQuizScreen as React.ComponentType;

// App content component that uses hooks
const AppContent = () => {
    return (
        <main className="min-h-screen text-foreground">
            {/* <RouteIndicator /> */}
            <Routes>
                {/* Default route redirects to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Login route */}
                <Route path="/login" element={<Login />} />
                
                {/* Teacher routes - Protected */}
                <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/classroom/:id" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <ClassroomDetails />
                    </ProtectedRoute>
                } />
                <Route path="/create-class" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <CreateClass />
                    </ProtectedRoute>
                } />
                <Route path="/students" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <Students />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/upload-document/:id" element={
                    <ProtectedRoute allowedRoles={['Teacher']}>
                        <UploadDocument />
                    </ProtectedRoute>
                } />
                
                {/* Student routes - Protected */}
                <Route path="/onboarding" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <OnboardingComponent />
                    </ProtectedRoute>
                } />
                <Route path="/pet-selector" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <PetSelector />
                    </ProtectedRoute>
                } />
                <Route path="/enter-code" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <EnterCodeScreen />
                    </ProtectedRoute>
                } />
                <Route path="/level-map/:classId" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <OptimizedCosmicMap />
                    </ProtectedRoute>
                } />
                <Route path="/levelmap/:classId" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <OptimizedCosmicMap />
                    </ProtectedRoute>
                } />
                <Route path="/quest-detail" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <QuestDetailComponent />
                    </ProtectedRoute>
                } />
                <Route path="/quiz/:questId" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <QuizComponent />
                    </ProtectedRoute>
                } />
                <Route path="/marketplace" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <Marketplace />
                    </ProtectedRoute>
                } />
                <Route path="/Edu" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <EdumonApp />
                    </ProtectedRoute>
                } />
                <Route path="/student-dashboard" element={
                    <ProtectedRoute allowedRoles={['Student']}>
                        <StudentDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </main>
    );
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;