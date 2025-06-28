import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import EnterCodeScreen from './screens/student/BeginScreen'; // relative path, no alias
import OptimizedCosmicMap from './screens/student/LevelMapScreen';
import QuestDetailScreen from './screens/student/QuestDetailScreen';
import GamifiedQuizScreen from './screens/student/QuizScreen';
import PetSelector from './screens/student/PetSelector';
import Onboarding from './screens/student/Onboarding';
import EdumonApp from './screens/student/Edumon';

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
                {/* Default route redirects to onboarding */}
                <Route path="/" element={<Navigate to="/onboarding" replace />} />
                
                {/* Onboarding route */}
                <Route path="/onboarding" element={<OnboardingComponent />} />
                
                {/* Pet Selector route */}
                <Route path="/pet-selector" element={<PetSelector />} />
                
                {/* Other routes (commented out for now) */}
                <Route path="/enter-code" element={<EnterCodeScreen />} />
                <Route path="/level-map" element={<OptimizedCosmicMap />} />
                <Route path="/quest-detail" element={<QuestDetailComponent />} />
                <Route path="/quiz" element={<QuizComponent />} />
            </Routes>
        </main>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App