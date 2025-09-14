import React from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const Navigate=useNavigate();
  const handleClick=()=>{
    Navigate('/SignUp');
  }
  return (
    <main className="w-full bg-violet-100 font-sans">
      {/* Hero Section */}
      
      <section
  className="relative text-center py-20 bg-cover bg-center"
  style={{backgroundImage:'url(/math-student.jpg)' }} // 👈 replace with your own image
>
  <div className="absolute inset-0  bg-opacity-40 "></div> 
  {/* overlay for readability */}

  <div className="relative z-10 max-w-3xl mx-auto px-6 font-mono">
    <h1 className="text-4xl md:text-5xl font-bold text-white">
      Personalised Staff Platform:{" "}
      <span className="text-blue-300">EduTrace</span>
    </h1>
    <p className="mt-4 text-gray-100">
      “A unified platform that ensures secure attendance tracking, personalized career development, and effortless timetable management for students and teachers.”
    </p>
    <button onClick={handleClick} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300">
      SIGN UP FOR FREE!
    </button>
  </div>
</section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-12 px-6">
        <div className="p-6 text-center border-none rounded-xl shadow-md bg-violet-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <img 
        src="/learning.png" 
        alt="Platform Logo" 
        className="ml-21 h-25 w-auto cursor-pointer"
      />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Career Development
          </h3>
          <p className="text-gray-600">
           Our AI-driven system supports career growth by giving teachers personalized modules and insights, helping them guide students with tailored advice and activities.
          </p>
        </div>

        <div className="p-6 text-center border-none rounded-xl shadow-md bg-violet-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                      <img 
        src="/attendance.png" 
        alt="Platform Logo" 
        className="ml-24 h-25 w-auto cursor-pointer"
      />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Attendance Reporting
          </h3>
          <p className="text-gray-600">
           Attendance is verified through face recognition and institution-verified IP, ensuring accuracy, preventing proxies, and saving valuable time.
          </p>
        </div>

        <div className="p-6 text-center border-none rounded-xl shadow-md bg-violet-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                      <img 
        src="/timetable.png" 
        alt="Platform Logo" 
        className="ml-26 h-25 w-auto cursor-pointer"
      />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Timetable Sceduling 
          </h3>
          <p className="text-gray-600">
            “Our platform simplifies scheduling by using AI to create smart timetables. It considers classes, faculty availability, and workload balance to generate efficient schedules that save time and reduce conflicts.”
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-violet-200 text-white py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          <div>
            <h2 className="text-2xl font-bold">1000</h2>
            <p>Registered Users</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">450</h2>
            <p>Timetable Created</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">10000</h2>
            <p>Students Tracked</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">300000</h2>
            <p>Attendance Records</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Our Motivation</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We believe education should be both fair and empowering. While students need personalized guidance to grow, teachers deserve a secure and transparent system for attendance. Our platform bridges this gap with smart recommendations and advanced face recognition. By combining innovation with integrity, we aim to transform learning and accountability.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 border-none rounded-xl shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300 text-gray-600 italic">
            "Marking attendance has never been this seamless. The face recognition with IP verification gives complete peace of mind, ensuring transparency and saving valuable class time." – Prof. Kunal Sharma
          </div>
          <div className="p-6 border-none rounded-xl shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300 text-gray-600 italic">
            "This platform not only makes staff attendance secure but also helps us focus more on teaching rather than administrative tasks. Truly a step forward for modern institutions." – Dr. Rajesh Verma
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-violet-200 py-16 text-center">
        <blockquote className="text-xl italic font-semibold text-gray-700 max-w-3xl mx-auto">
          "Technology is just a tool. In terms of getting the kids working
          together and motivating them, the teacher is the most important thing."
        </blockquote>
        <p className="mt-4 text-gray-500">- Bill Gates</p>
      </section>
    </main>
  );
};

export default Main;
