import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Home from './pages/Home'
import Test from './pages/Test'
import Results from './pages/Results'
import AllTypes from './pages/AllTypes'
import TypeDetail from './pages/TypeDetail'

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
          <Route path="/types" element={<AllTypes />} />
          <Route path="/types/:typeId" element={<TypeDetail />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
