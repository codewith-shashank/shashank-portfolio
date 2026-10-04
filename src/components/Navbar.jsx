import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return true;
  });

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'LeetCode', href: '#leetcode' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="#home"
          className="navbar-logo"
          onClick={handleNavClick}
        >
          SG<span>.</span>
        </a>

        <div className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              darkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            <span className="theme-icon">
              {darkMode ? '☀' : '☾'}
            </span>
          </button>

          <a
            href="/resume.pdf"
            download
            className="resume-button"
          >
            Resume
          </a>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            ))}

            <button
              className="mobile-theme-toggle"
              onClick={toggleTheme}
            >
              {darkMode
                ? '☀  Light Mode'
                : '☾  Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;