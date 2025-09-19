import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Top from "../parts/Top";
import Bottom from "../parts/Bottom";
import LoginPop from "../parts/LogInPop";
import {
  Camera,
  CameraOff,
  User,
  IdCard,
  CheckCircle,
  XCircle,
  RefreshCcw,
} from "lucide-react";

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

  const storeRecord = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/StoreRecord", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      console.log(result);
      console.log(result.record);
    } catch (err) {
      console.log(err);
    }
  };

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
            image: preview,
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
          console.log(result);
          const data = {
            userId: user._id,
            status: "Present",
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          if (result.verified) {
            setSuccess(true);
            setErrorMsg("");
            storeRecord(data);
          } else {
            data.status = "Absent";
            setSuccess(false);
            setErrorMsg(result.reason || "Verification failed.");
            storeRecord(data);
          }
        } catch (err) {
          console.log("visited");
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
      <LoginPop />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-100 to-violet-200 p-6">
        <div className="bg-violet-50 shadow-2xl rounded-2xl p-10 w-full max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-700">
            Attendance Panel
          </h2>

          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-violet-500" />
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.username}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="w-6 h-6 text-violet-500" />
              <p className="text-lg">
                <span className="font-semibold">College ID:</span>{" "}
                {user.collegeid}
              </p>
            </div>
          </div>

          {/* Webcam / Preview */}
          <div className="flex flex-col items-center">
            {!preview && !cameraOn && (
              <button
                type="button"
                onClick={() => setCameraOn(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow hover:bg-blue-600 hover:scale-105 transition-all duration-300"
              >
                <Camera className="w-5 h-5" /> Open Camera
              </button>
            )}

            {cameraOn && (
              <div className="mb-4 flex flex-col items-center">
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
                  className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                >
                  <CameraOff className="w-5 h-5" /> Capture
                </button>
              </div>
            )}

            {preview && (
              <div className="mb-4 flex flex-col items-center">
                <img
                  src={preview}
                  alt="Face Preview"
                  className="w-64 h-64 object-cover rounded-full border-4 border-violet-300 shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setCameraOn(false);
                    setSuccess(false);
                    setErrorMsg("");
                  }}
                  className="mt-3 flex items-center gap-2 bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-400 hover:scale-105 transition-all duration-300"
                >
                  <RefreshCcw className="w-5 h-5" /> Retake
                </button>
              </div>
            )}

            {preview && !cameraOn && (
              <button
                onClick={handleVerify}
                className="mt-2 flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
              >
                <CheckCircle className="w-5 h-5" /> Verify Attendance
              </button>
            )}

            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 text-red-600 font-medium">
                <XCircle className="w-5 h-5" /> {errorMsg}
              </div>
            )}

            {success && (
              <div className="mt-6 flex items-center justify-center gap-2 p-4 w-full bg-green-500 text-white rounded-xl shadow-lg">
                <CheckCircle className="w-6 h-6" /> Attendance Verified
              </div>
            )}
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
}
