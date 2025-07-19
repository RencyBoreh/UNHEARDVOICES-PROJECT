import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import SubmitStory from './pages/SubmitStory';
import StoryDetail from './pages/StoryDetail';
import Donate from './pages/Donate';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import ExplorePage from './pages/ExplorePage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<ExplorePage />} /> {/* ✅ now points to ExplorePage */}
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/submit" element={<SubmitStory />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donate/:id" element={<Donate />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Extra Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
