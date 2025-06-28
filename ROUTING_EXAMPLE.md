# React Router Implementation Example

This document demonstrates how routing is implemented between the components in this React application.

## Routing Flow

### 1. App.tsx - Main Router Setup
```tsx
// App.tsx contains the main routing configuration
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/onboarding" replace />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/pet-selector" element={<PetSelector />} />
  </Routes>
</BrowserRouter>
```

### 2. Navigation Flow

#### Step 1: Onboarding Screen (`/onboarding`)
- **File**: `src/screens/student/Onboarding.jsx`
- **Navigation Trigger**: "Start Mission" button click
- **Navigation Method**: `useNavigate()` hook from React Router
- **Target Route**: `/pet-selector`

```tsx
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const navigate = useNavigate();
    
    const handleStartMission = () => {
        console.log("🚀 Starting mission... Navigating to Pet Selector");
        navigate('/pet-selector');
    };
    
    return (
        // ... component JSX
        <CyberButton 
            label="Start Mission" 
            onClick={handleStartMission}
        />
    );
}
```

#### Step 2: Pet Selector Screen (`/pet-selector`)
- **File**: `src/screens/student/PetSelector.tsx`
- **Navigation Options**:
  - **Back Button**: Returns to `/onboarding`
  - **Continue Button**: Ready for next route (currently logs to console)

```tsx
import { useNavigate } from 'react-router-dom';

export default function PetSelector() {
    const navigate = useNavigate();
    
    const handleBackToOnboarding = () => {
        console.log("⬅️ Going back to Onboarding");
        navigate('/onboarding');
    };
    
    const handleContinueJourney = () => {
        console.log('🎮 Continuing journey with pet:', confirmedPet?.name);
        // navigate('/next-screen'); // Ready for next route
    };
    
    return (
        <div>
            {/* Back Button */}
            <button onClick={handleBackToOnboarding}>
                <ArrowLeft /> Back to Onboarding
            </button>
            
            {/* Continue Button (in celebration modal) */}
            <Button onClick={handleContinueJourney}>
                Begin Your Journey
            </Button>
        </div>
    );
}
```

## Key Features

### 1. Route Indicator
- Shows current route in top-right corner
- Helps visualize navigation during development

### 2. Console Logging
- Detailed logging shows navigation flow
- Helps debug routing behavior

### 3. Default Route
- Root path (`/`) automatically redirects to `/onboarding`
- Ensures users always start at the beginning

### 4. Navigation Methods
- **Programmatic Navigation**: Using `navigate('/route')`
- **Declarative Navigation**: Using `<Link>` components (can be added)
- **Redirect Navigation**: Using `<Navigate>` component

## How to Test

1. **Start the app**: The app will automatically redirect to `/onboarding`
2. **Click "Start Mission"**: Navigates to `/pet-selector`
3. **Click "Back to Onboarding"**: Returns to `/onboarding`
4. **Select a pet and confirm**: Shows celebration modal
5. **Click "Begin Your Journey"**: Currently logs to console (ready for next route)

## Adding More Routes

To add more routes, follow this pattern:

1. **Add route in App.tsx**:
```tsx
<Route path="/new-screen" element={<NewScreen />} />
```

2. **Import the component**:
```tsx
import NewScreen from './screens/student/NewScreen';
```

3. **Add navigation in components**:
```tsx
const navigate = useNavigate();
navigate('/new-screen');
```

## Benefits of This Implementation

- ✅ **Clean separation of concerns**
- ✅ **Easy to add new routes**
- ✅ **Visual feedback during development**
- ✅ **Proper navigation flow**
- ✅ **Back button functionality**
- ✅ **Console logging for debugging** 