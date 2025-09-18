import React from 'react';
import Top from '../parts/Top';
import { useState,useEffect } from 'react';
import Bottom from '../parts/Bottom';
import LoginPop from '../parts/LogInPop';
const Profile = () => {
  // You will fetch the user data here.
  // For now, we'll use placeholder values.
  const [user,setuser]=useState([])
  useEffect(()=>{
    const func=async ()=>{
        console.log("visited");
        try{
        const res=await fetch('http://localhost:3000/Protected',{
            method:"GET",
            credentials:"include",
            
            
        })
        const result=await res.json();
        if(result.success==='true'){
          setuser(result.user);
        }
        console.log(result);
        }catch(err){
            console.log(err)
        }
        
    }
    func();
  },[])

  return (<>
    <Top/>
    <LoginPop/>
    <div className="bg-gradient-to-br from-violet-50 to-violet-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-violet-100 to-violet-300 rounded-xl shadow-lg p-8 w-full max-w-120">
        <div className="flex flex-col items-center">
          <img
            src={user.faceImage} 
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover border-1 border-white shadow-md mb-6"
          />
          <h1 className="text-3xl font-bold  mb-2">{user.username}</h1>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">Phone Number:</span>
            <span>{user.phonenumber}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">College:</span>
            <span className='text-xs'>G.L Bajaj Institute of Technology and Management</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-semibold">College ID:</span>
            <span>{user.collegeid}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Address:</span>
            <span className="text-right">Street-A12 Park Avenue London</span>
          </div>
        </div>
      </div>
    </div>
    <Bottom/>
    </>
  );
};

export default Profile;