import { useCalculator } from './hooks/useCalculator'
import CalcPanel from './panel/panel'

function App() {
  const {screenData, message, actions, isMemoryUsed} = useCalculator()

  return (
    <>
      <CalcPanel 
        screenData={screenData} 
        actions={actions}
        message={message}
        isMemoryUsed={isMemoryUsed}
      />
    </>
  )
}

export default App
