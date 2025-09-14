import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full shadow bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
           <img 
        src="/logo.png" 
        alt="Platform Logo" 
        className="h-12 w-auto cursor-pointer"
      />
          <span className="text-xl font-bold text-blue-600">EduTrace</span>
          
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-600">
          <li className="hover:text-blue-600 hover:font-bold transition-all cursor-pointer">Home</li>
          <li className="hover:text-blue-600 hover:font-bold transition-all cursor-pointer">About</li>
          <li className="hover:text-blue-600 hover:font-bold transition-all cursor-pointer">Contact us</li>
          <Link to='/SignUp' className="text-blue-600 font-medium hover:font-extrabold transition-all cursor-pointer">
            Register/Login
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;