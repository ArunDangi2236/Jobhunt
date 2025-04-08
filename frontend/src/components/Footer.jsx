// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2025 Job Hunt. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/about" className="text-gray-400 hover:text-white mx-4">About</Link>
          <Link to="/services" className="text-gray-400 hover:text-white mx-4">Services</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white mx-4">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
