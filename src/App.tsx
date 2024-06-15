import { AlertProvider } from "./components/context/AlertContext"
import Projects from "./components/pages/Projects"



export function App() {

  return (
    <div >
      <AlertProvider>
        <Projects/>
      </AlertProvider>
    </div>
  )
}

export default App
