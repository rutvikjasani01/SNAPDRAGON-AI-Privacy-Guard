import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Product', path: '/' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Technology', path: '/technology' },
    { name: 'Scan', path: '/scan' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-surfaceBorder/50">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight text-white">SNAPDRAGON</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location.pathname === link.path ? 'text-white' : 'text-text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link to="/scan">
              <Button variant="primary" size="sm" className="group">
                Start a Scan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-surfaceBorder"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-white bg-surfaceHover'
                      : 'text-text-secondary hover:text-white hover:bg-surfaceHover'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 pt-4">
                <Link to="/scan" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full justify-center group">
                    Start a Scan
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
