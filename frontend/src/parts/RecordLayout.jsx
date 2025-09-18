import React, { useState, useMemo } from "react";
import { 
  User, 
  Mail, 
  IdCard, 
  Phone, 
  Calendar, 
  CheckCircle, 
  BarChart3, 
  Zap, 
  MapPin, 
  FileText, 
  XCircle 
} from "lucide-react";

const RecordLayout = ({ user }) => {
  console.log(user);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Calculate attendance statistics
  const attendanceStats = useMemo(() => {
    if (!user?.attendanceRecords || user.attendanceRecords.length === 0) {
      return { totalDays: 0, presentDays: 0, absentDays: 0, attendanceRate: 0, recentStreak: 0 };
    }

    const records = user.attendanceRecords;
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === "Present").length;
    const absentDays = totalDays - presentDays;
    const attendanceRate = Math.round((presentDays / totalDays) * 100);

    // Calculate recent streak
    let recentStreak = 0;
    const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const record of sortedRecords) {
      if (record.status === "Present") recentStreak++;
      else break;
    }

    return { totalDays, presentDays, absentDays, attendanceRate, recentStreak };
  }, [user?.attendanceRecords]);

  // Filter records by month
  const filteredRecords = useMemo(() => {
    if (!user?.attendanceRecords || selectedMonth === "all") return user?.attendanceRecords || [];
    const targetMonth = parseInt(selectedMonth);
    return user.attendanceRecords.filter(record => new Date(record.date).getMonth() === targetMonth);
  }, [user?.attendanceRecords, selectedMonth]);

  // Get available months
  const availableMonths = useMemo(() => {
    if (!user?.attendanceRecords) return [];
    const months = new Set(user.attendanceRecords.map(record => new Date(record.date).getMonth()));
    return Array.from(months).sort().map(month => ({
      value: month.toString(),
      label: new Date(2024, month, 1).toLocaleString("default", { month: "long" })
    }));
  }, [user?.attendanceRecords]);

  // Utility functions
  const getStatusColor = (status) => 
    status === "Present" 
      ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-emerald-200" 
      : "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-rose-200";
  
  const getAttendanceRateColor = (rate) => 
    rate >= 90 ? "text-emerald-600" : rate >= 75 ? "text-amber-500" : "text-rose-500";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-6">
        <div className="bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-3xl p-12 shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-violet-700 mb-2">No Data Available</h3>
          <p className="text-violet-500">Please provide user information to view attendance records</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50  to-violet-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative p-8 lg:p-12 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-1">{user.username}</h1>
                    <p className="text-violet-100 font-medium">Teacher</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${getAttendanceRateColor(attendanceStats.attendanceRate)}`} style={{color: 'white'}}>
                    {attendanceStats.attendanceRate}%
                  </div>
                  <div className="text-violet-100 text-sm">Attendance Rate</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-violet-200" />
                  <span className="text-violet-200 text-sm font-medium">Email Address</span>
                </div>
                <p className="font-semibold text-lg">{user.email}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <IdCard className="w-5 h-5 text-violet-200" />
                  <span className="text-violet-200 text-sm font-medium">College ID</span>
                </div>
                <p className="font-semibold text-lg">{user.collegeid}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-violet-200" />
                  <span className="text-violet-200 text-sm font-medium">Phone Number</span>
                </div>
                <p className="font-semibold text-lg">{user.phonenumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100/50 hover:shadow-2xl hover:shadow-violet-200/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-violet-400 to-purple-400 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Total Days</h3>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors duration-300">
              {attendanceStats.totalDays}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100/50 hover:shadow-2xl hover:shadow-emerald-200/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Present Days</h3>
            <p className="text-3xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
              {attendanceStats.presentDays}
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100/50 hover:shadow-2xl hover:shadow-violet-200/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Attendance Rate</h3>
            <p className={`text-3xl font-bold transition-colors duration-300 ${getAttendanceRateColor(attendanceStats.attendanceRate)}`}>
              {attendanceStats.attendanceRate}%
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100/50 hover:shadow-2xl hover:shadow-violet-200/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-blue-600 text-sm font-semibold mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-violet-700 group-hover:text-violet-800 transition-colors duration-300">
              {attendanceStats.recentStreak}
            </p>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-violet-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-8 py-6 border-b border-violet-200/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-1">Attendance Records</h2>
                <p className="text-gray-600 text-sm">Track your attendance history</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {availableMonths.length > 1 && (
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-white/90 backdrop-blur-sm border border-violet-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-violet-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <option value="all">All Months</option>
                    {availableMonths.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                )}
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                >
                  {isExpanded ? "Show Less" : "Show All Records"}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredRecords.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date & Day</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-100/50">
                  {(isExpanded ? filteredRecords : filteredRecords.slice(0, 10)).map((record, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 transition-all duration-200 group">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric", 
                              month: "short", 
                              day: "numeric"
                            })}
                          </span>
                          <span className="text-sm text-violet-600">
                            {new Date(record.date).toLocaleDateString("en-US", { weekday: "long" })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 group-hover:shadow-md ${getStatusColor(record.status)}`}>
                          {record.status === "Present" ? (
                            <CheckCircle className="w-3 h-3 mr-1.5" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1.5" />
                          )}
                          {record.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-violet-400" />
                          <span className="text-sm text-gray-600 font-mono">
                            {record.latitude && record.longitude
                              ? `${record.latitude.toFixed(4)}, ${record.longitude.toFixed(4)}`
                              : "No location data"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Records Found</h3>
                <p className="text-violet-500">No attendance records are available for the selected period</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordLayout;