import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Top from "../parts/Top";
import Bottom from "../parts/Bottom";
export default function FaceCapture() {
  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [user,setuser]=useState([]);
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
  
  // Capture image
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    
    setCameraOn(false); 
  };
  const handleclick=()=>{
    console.log(preview);
  }
  return (
    <><Top/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Attendance Panel
        </h2>

        {/* Display Student Info */}
        <div className="space-y-3 mb-6 text-left">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            <span className="text-gray-700">{user.username}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">College ID:</span>{" "}
            <span className="text-gray-700">{user.collegeid}</span>
          </p>
        </div>

        {/* Webcam / Preview Section */}
        <div className="flex flex-col items-center">
          {!preview && !cameraOn && (
            <button
              type="button"
              onClick={() => setCameraOn(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600 hover:scale-105 transforms-all duration-300 "
            >
              Open Camera
            </button>
          )}

          {cameraOn && (
            <div className="mb-4">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 320,
                  height: 320,
                  facingMode: "user",
                }}
                className="rounded-2xl shadow-md"
              />
              <button
                type="button"
                onClick={capture}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-4xl shadow hover:bg-blue-600 hover:scale-105 transform-all duration-300"
              >
                Capture
              </button>
            </div>
          )}

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Face Preview"
                className="w-64 h-64 object-cover rounded-full border-1 border-violet-300"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setCameraOn(false);
                }}
                className="mt-3 bg-gray-300 text-gray-800 px-4 py-2 rounded-4xl shadow hover:bg-gray-400 hover:scale-105 transform-all duration-300"
              >
                Retake
              </button>
            </div>
          )}
          {preview&&!cameraOn&&(
                <button onClick={handleclick} className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300">Verify Attendance</button>
          )}
        </div>
      </div>
    </div>
    <Bottom/>
    </>
  );
}
