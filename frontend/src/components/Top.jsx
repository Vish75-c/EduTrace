import React from 'react'

const Top = () => {
  return (
    <nav className="w-full shadow bg-white">
      <div className="ml-7 mx-auto flex justify-between items-center py-4 ">
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
        
      </div>
    </nav>
  );
}

export default Top
