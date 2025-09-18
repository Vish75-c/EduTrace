import React, { useEffect, useState } from "react";
import RecordLayout from "../parts/RecordLayout";
import Top from "../parts/Top";
import LoginPop from "../parts/LogInPop";
import Bottom from "../parts/Bottom";
const Record = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // 🔹 You will replace this with your fetch call
    const mockData = {
      username: "JohnDoe",
      email: "john@example.com",
      collegeid: 12345,
      phonenumber: 9876543210,
      attendanceRecords: [
        { status: "Present", date: "2025-09-18T00:00:00.000Z", latitude: 28.61, longitude: 77.23 },
        { status: "Absent", date: "2025-09-17T00:00:00.000Z" }
      ]
    };
    const func=async ()=>{
      try{
        const res=await fetch('http://localhost:3000/GetRecord',{
          method:"GET",
          credentials:"include"
        })
        const result=await res.json();
        console.log(result);
        setUserData(result.user);
      }catch(err){
        console.log(err);
      }
    }
    func();
    setUserData(mockData);
    
  }, []);

  return (
    <>
    <Top/>
    <LoginPop/>
    
      <RecordLayout user={userData}/>
   
    <Bottom/>
    </>
  );
};

export default Record;
