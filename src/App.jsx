import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import SmoothScroll from './lib/SmoothScroll'
import ScrollToTop from './lib/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const [loaded, setLoaded] = useState(false)

  return (
    <SmoothScroll>
      <div className="grain-overlay relative min-h-screen overflow-x-hidden bg-ink">
        <CustomCursor />
        {!loaded && <Loader onDone={() => setLoaded(true)} />}

        <ScrollToTop />
        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
