import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route} from 'react-router-dom';

import Homepage from './pages/Homepage'
import Callback from './components/Callback'
import Projects from './pages/Projects';
import Issues from './pages/Issues';

import './App.css'


function App() {

  
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/projects/" element={<Projects />} />
          <Route path="/project/:id/issues" element={<Issues/>} />
        </Routes>
      </ChakraProvider>
    </>
  )
}

export default App
