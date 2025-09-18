import { useEffect, useState } from "react";

export default function LoginPop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/Protected", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (result.success !== "true") {
          setShow(true);
        }
      } catch (err) {
        console.log(err);
        setShow(true);
      }
    };

    checkAuth();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all scale-100 hover:scale-[1.02] duration-300">
        <h2 className="text-2xl font-extrabold mb-3 text-gray-800">
          🔒 Login Required
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          You need to log in to continue accessing this page.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/SignIn")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-4xl shadow hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Go to SignIn
          </button>
        </div>
      </div>
    </div>
  );
}
