import React from 'react'
import EnterCodeScreen from './screens/student/BeginScreen'; // relative path, no alias
import OptimizedCosmicMap from './screens/student/LevelMapScreen';
function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* <EnterCodeScreen /> */}
      <OptimizedCosmicMap />
    </main>
  )
}

export default App