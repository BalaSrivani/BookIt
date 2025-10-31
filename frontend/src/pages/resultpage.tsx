import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // You can pass refId from navigate state after successful booking
  const refId = location.state?.refId || "HUFS8&SO";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      {/* Logo (optional top area) */}
      <div className="absolute top-6 left-8">
        <img
          src="/logo.png" // replace with your actual logo path
          alt="Highway Delite Logo"
          className="h-8"
        />
      </div>

      {/* Success Icon */}
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

      {/* Confirmation Text */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Booking Confirmed
      </h1>

      {/* Reference ID */}
      <p className="text-gray-600 mb-6">Ref ID: {refId}</p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium transition"
      >
        Back to Home
      </button>
    </div>
  );
}
