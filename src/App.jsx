import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
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
import Films from './pages/Films'
import WorkDetail from './pages/WorkDetail'
import Videos from './pages/Videos'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Social from './pages/Social'
import Search from './pages/Search'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Redirect old /work/:slug links to the new /films/:slug route
function WorkSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/films/${slug}`} replace />
}

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
              <Route path="/films" element={<Films />} />
              <Route path="/films/:slug" element={<WorkDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/social" element={<Social />} />
              <Route path="/search" element={<Search />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              {/* Legacy redirects */}
              <Route path="/work" element={<Navigate to="/films" replace />} />
              <Route path="/work/:slug" element={<WorkSlugRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
