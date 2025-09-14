import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {/* Features */}
        <div>
          <h4 className="font-bold text-white mb-3">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>Fast and Easy Attendance Entry</li>
            <li>Career Development for Student</li>
            <li>Teacher Modules</li>
            <li>Customizable TimeTable</li>
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h4 className="font-bold text-white mb-3">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li>Register</li>
            <li>Login</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* About */}
        

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-3">Contact</h4>
          <a href="#" className="text-blue-400 text-sm hover:underline">
            Send us an Email
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 EduTrace. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;