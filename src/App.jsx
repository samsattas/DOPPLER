import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/templates/Layout'
import Projects from './components/pages/Projects'
import Partners from './components/pages/Partners'
import PageContainer from './components/templates/PageContainer'
import Home from './components/pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <PageContainer>
              <Layout />
            </PageContainer>
          }>
            <Route path="" element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="partners" element={<Partners />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
