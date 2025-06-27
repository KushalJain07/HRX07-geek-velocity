import React from 'react'
import EnterCodeScreen from './screens/student/BeginScreen'; // relative path, no alias

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <EnterCodeScreen />
    </main>
  )
}

export default App