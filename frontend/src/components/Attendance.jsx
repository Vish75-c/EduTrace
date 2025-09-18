import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Top from "../parts/Top";
import Bottom from "../parts/Bottom";
import LoginPop from "../parts/LogInPop";
export default function FaceCapture() {
  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [user, setUser] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 
 
  useEffect(() => {
    const func = async () => {
      try {
        const res = await fetch("http://localhost:3000/Protected", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (result.success === "true") {
          setUser(result.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setCameraOn(false);
  };

  // Send image + location to backend
  const handleVerify = async () => {
    
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const body = {
            email: user.email,
            image: preview, // base64 jpeg
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          const res = await fetch("http://localhost:3000/verify", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const result = await res.json();
          if (result.verified) {
            setSuccess(true);
            setErrorMsg("");
          } else {
            setSuccess(false);
            setErrorMsg(result.reason || "Verification failed.");
          }
        } catch (err) {
          setErrorMsg("Server error: " + err.message);
        }
      },
      (err) => {
        setErrorMsg("Location error: " + err.message);
      }
    );
  };

  return (
    <>
      <Top />
      <LoginPop/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-violet-200 p-6">
        <div className="bg-gradient-to-br from-violet-100 to-violet-300 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Attendance Panel
          </h2>

          {/* Student Info */}
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

          {/* Webcam / Preview */}
          <div className="flex flex-col items-center">
            {!preview && !cameraOn && (
              <button
                type="button"
                onClick={() => setCameraOn(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-4xl shadow hover:bg-blue-600 hover:scale-105 transitions-all duration-300"
              >
                Open Camera
              </button>
            )}

            {cameraOn && (
              <div className="mb-4">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ width: 320, height: 320, facingMode: "user" }}
                  className="rounded-2xl shadow-md"
                />
                <button
                  type="button"
                  onClick={capture}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-4xl shadow hover:bg-blue-600 hover:scale-105 transition-all duration-300"
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
                  className="w-64 h-64 object-cover rounded-full border border-violet-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setCameraOn(false);
                    setSuccess(false);
                    setErrorMsg("");
                  }}
                  className="mt-3 bg-gray-300 text-gray-800 px-4 py-2 rounded-4xl shadow hover:bg-gray-400 hover:scale-105 transition-all duration-300"
                >
                  Retake
                </button>
              </div>
            )}

            {preview && !cameraOn && (
              <button
                onClick={handleVerify}
                className="mt-1 px-6 py-3 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
              >
                Verify Attendance
              </button>
            )}

            {errorMsg && (
              <p className="mt-3 text-red-600 font-medium">{errorMsg}</p>
            )}

            {success && (
              <h1 className="text-lg mt-3 w-full bg-green-600 p-2 text-white rounded-4xl">
                Attendance Verified
              </h1>
            )}
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
}
