import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPop from "../parts/LogInPop";
import {
  User,
  Clock,
  Calendar,
  Mail,
  BookOpen,
  PenTool,
  GraduationCap,
  TrendingUp,
  Activity,
} from "lucide-react";
import Top from "../parts/Top";
import Bottom from "../parts/Bottom";

// 🔹 Enhanced Quick Action Card
const QuickActionCard = ({ title, btn, color, icon: Icon, onClick }) => {
  const actionColors = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    purple: "bg-purple-500 hover:bg-purple-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    violet: "bg-violet-400 hover:bg-violet-500 text-white",
  };

  return (
    <div className="group relative overflow-hidden">
      <div className="bg-white/70 backdrop-blur-sm border border-violet-100 p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.03]">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-violet-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4 mb-6">
          <div className="p-4 rounded-xl bg-violet-100 text-violet-600 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
            <Icon size={30} />
          </div>
          <h2 className="font-bold text-xl text-gray-700 group-hover:text-violet-600 transition-colors duration-500">
            {title}
          </h2>
        </div>

        <button
          onClick={onClick}
          className={`w-full px-6 py-4 rounded-full text-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 ${actionColors[color]}`}
        >
          {btn}
        </button>
      </div>
    </div>
  );
};

// 🔹 Class Schedule Card
const ClassCard = ({ name, time, color }) => {
  const classColors = {
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    purple: "border-purple-500 bg-purple-50",
    violet: "border-violet-500 bg-violet-50",
  };

  return (
    <div
      className={`${classColors[color]} border-l-4 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <Clock size={14} /> {time}
          </p>
        </div>
        <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
      </div>
    </div>
  );
};

// 🔹 Teacher Dashboard
export default function Section() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);

  useEffect(() => {
    try {
      const func = async () => {
        const res = await fetch("http://localhost:3000/Protected", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        setuser(result.user);
      };
      func();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const todayClasses = [
    { name: "Mathematics - Grade 8", time: "9:00 AM - 10:00 AM", color: "blue" },
    { name: "Science - Grade 7", time: "10:30 AM - 11:30 AM", color: "green" },
    { name: "English Literature - Grade 10", time: "3:30 PM - 4:30 PM", color: "violet" },
  ];

  const stats = [
    { title: "Total Students", value: "247", icon: GraduationCap, trend: "+12%" },
    { title: "Classes Today", value: "6", icon: Calendar, trend: "+2" },
    { title: "Attendance Rate", value: "94%", icon: TrendingUp, trend: "+3%" },
  ];

  return (
    <>
      <Top />
      <LoginPop />
      <div className="min-h-screen bg-gradient-to-br from-violet-100 to-violet-200">
        {/* Header */}
        <header className="bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-white/80 text-lg mt-2">
              Welcome back, <span className="font-semibold">{user.username}</span>
            </p>
            <p className="text-sm opacity-75">Here’s an overview of your day</p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-violet-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-700 mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      {stat.trend}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-100 text-violet-600">
                    <stat.icon size={30} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-violet-500 rounded-full" />
              <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickActionCard
                title="Profile"
                btn="Profile Section"
                color="orange"
                icon={User}
                onClick={() => navigate("/Section/Profile")}
              />
              <QuickActionCard
                title="Mark Attendance"
                btn="Mark Now"
                color="blue"
                icon={PenTool}
                onClick={() => navigate("/Section/Attendance")}
              />
              <QuickActionCard
                title="Attendance Record"
                btn="View Records"
                color="green"
                icon={Clock}
                onClick={() => navigate("/Section/Records")}
              />
              <QuickActionCard
                title="Modules"
                btn="Open Modules"
                color="purple"
                icon={BookOpen}
                onClick={() => navigate("/Section/Modules")}
              />
              <QuickActionCard
                title="TimeTable"
                btn="View Timetable"
                color="violet"
                icon={Calendar}
                onClick={() => navigate("/Section/Timetable")}
              />
              <QuickActionCard
                title="Inbox"
                btn="Open Inbox"
                color="red"
                icon={Mail}
                onClick={() => navigate("/Section/Inbox")}
              />
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Classes */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-violet-500 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-violet-600" /> Today’s Classes
                </h2>
              </div>
              <div className="space-y-5">
                {todayClasses.map((item, idx) => (
                  <ClassCard
                    key={idx}
                    name={item.name}
                    time={item.time}
                    color={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-violet-500 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-violet-600" /> Student Engagement
                </h2>
              </div>
              <div className="space-y-5">
                {/* Activities */}
                <div className="bg-white/80 backdrop-blur-sm border border-violet-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-700 text-lg">
                        Activity Suggestions
                      </h3>
                      <p className="text-gray-500 mt-1">
                        Boost participation and understanding with curated tasks.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-sm">
                    View Activities →
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-sm border border-violet-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="font-bold text-gray-700 text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-violet-600" /> Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-50">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <p className="text-sm text-gray-700">
                        Sarah completed Math Quiz #3
                      </p>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-50">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <p className="text-sm text-gray-700">
                        Grade 8 average: 87% on latest test
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
}
