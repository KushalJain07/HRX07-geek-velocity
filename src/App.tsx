import React from 'react'
import EnterCodeScreen from './screens/student/BeginScreen'; // relative path, no alias
import OptimizedCosmicMap from './screens/student/LevelMapScreen';
import QuestDetailScreen from './screens/student/QuestDetailScreen'
function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* <EnterCodeScreen /> */}
      {/* <OptimizedCosmicMap /> */}
      <QuestDetailScreen />
    </main>
  )
}

export default App