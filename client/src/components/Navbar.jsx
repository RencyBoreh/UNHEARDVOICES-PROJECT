// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../context/ThemeToggle';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      <nav className={`flex flex-wrap items-center justify-between px-4 transition-all duration-300
        ${scrolled
          ? 'py-2 bg-gradient-to-r from-pink-400 to-purple-600 shadow-lg'
          : 'py-3 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600'}
        text-white`}>

        {/* Logo */}
   <div className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
  VoicesUnheard
</div>



        {/* Center Nav */}
        <div className="hidden md:flex justify-center flex-1">
          <div className="flex gap-4 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md">
            {['/', '/submit', '/stories', '/donate', '/about', '/contact'].map((path) => {
              const label = {
                '/': 'Home',
                '/submit': 'Submit Story',
                '/stories': 'Explore',
                '/donate': 'Donate',
                '/about': 'About',
                '/contact': 'Contact',
              }[path];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive ? 'underline font-semibold text-white' : 'hover:underline'
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold hidden sm:inline' : 'hover:underline hidden sm:inline'
            }
          >
            Admin
          </NavLink>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 flex flex-wrap gap-4 justify-center text-sm">
        {['/', '/submit', '/stories', '/donate', '/about', '/contact', '/admin/login'].map((path) => {
          const label = {
            '/': 'Home',
            '/submit': 'Submit',
            '/stories': 'Explore',
            '/donate': 'Donate',
            '/about': 'About',
            '/contact': 'Contact',
            '/admin/login': 'Admin',
          }[path];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
            >
              {label}
            </NavLink>
          );
        })}
      </div>
    </header>
  );
};

export default Navbar;
