import React, { useState, useEffect } from "react";
import Top from "../parts/Top";
import Bottom from "../parts/Bottom";
import LoginPop from "../parts/LogInPop";
import {
  Mail,
  Phone,
  School,
  IdCard,
  MapPin,
  UserCircle,
} from "lucide-react";

const Profile = () => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    const func = async () => {
      console.log("visited");
      try {
        const res = await fetch("http://localhost:3000/Protected", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (result.success === "true") {
          setuser(result.user);
        }
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  return (
    <>
      <Top />
      <LoginPop />
      <div className="bg-gradient-to-br from-violet-100 to-violet-200 min-h-screen flex items-center justify-center p-6">
        <div className="bg-violet-50 rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
          {/* Profile Picture + Name */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={user.faceImage}
                alt="User Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <UserCircle className="absolute -bottom-2 -right-2 w-10 h-10 text-violet-500 bg-white rounded-full shadow-md p-1" />
            </div>
            <h1 className="text-4xl font-bold mt-4 text-gray-700">
              {user.username}
            </h1>
          </div>

          {/* User Info */}
          <div className="space-y-6 text-gray-700 text-lg">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-violet-500" />
                <span className="font-semibold">Email</span>
              </div>
              <span>{user.email}</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-violet-500" />
                <span className="font-semibold">Phone Number</span>
              </div>
              <span>{user.phonenumber}</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <School className="w-6 h-6 text-violet-500" />
                <span className="font-semibold">College</span>
              </div>
              <span>Fortune World School</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <IdCard className="w-6 h-6 text-violet-500" />
                <span className="font-semibold">College ID</span>
              </div>
              <span>{user.collegeid}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-violet-500" />
                <span className="font-semibold">Address</span>
              </div>
              <span className="text-right">
                Street-A12 Park Avenue Sector-105
              </span>
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default Profile;
