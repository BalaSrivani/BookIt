import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../axios";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    experienceId,
    slotId,
    selectedDate,
    selectedTime,
    quantity,
    subtotal,
    tax,
    total,
    title,
  } = state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const validatePromo = async () => {
    if (!promoCode.trim()) {
      alert("Please enter the promo code to apply");
      return;
    }

    try {
      const res = await api.post(`/promos/validate`, { code: promoCode });
      if (res.data.message === "Promo valid") {
        setDiscount(res.data.discountValue || 0);
        alert(`Promo applied! You saved ₹${res.data.discountValue}`);
      } else {
        alert("Invalid promo code");
        setPromoCode("");
        setDiscount(0);
      }
    } catch (error) {
      console.error("Promo validation failed:", error);
      alert("Invalid promo code");
      setPromoCode("");
      setDiscount(0);
    }
  };

  const handleConfirm = async () => {
    if (!name || !email || !agreed)
      return alert("Please fill all required fields and agree to the terms.");

    const bookingData = {
      experienceId,
      slotId,
      name,
      email,
      totalPrice: total - discount,
      promoCode: promoCode || null,
    };

    console.log("Booking data being sent:", bookingData);

    try {
      const res = await api.post("/bookings", bookingData);
      console.log("Booking success:", res.data);
      navigate("/result", { state: res.data.booking });
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10">
      {/* 🔙 Back Arrow on top */}
      <h2
        className="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl">←</span>
        <span>CheckOut</span>
      </h2>

      {/* Main content section */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* LEFT FORM SECTION */}
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="bg-gray-100 rounded-xl p-6 space-y-5 shadow-sm">
            {/* Full Name & Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-gray-200 text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@test.com"
                  className="w-full bg-gray-200 text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Promo code */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Promo code</label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 bg-gray-200 text-gray-700 rounded-l-lg px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  className="bg-black text-white px-5 rounded-r-lg hover:bg-gray-800"
                  onClick={validatePromo}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="accent-yellow-400 w-4 h-4"
              />
              <label className="text-sm text-gray-700">
                I agree to the terms and safety policy
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY SECTION */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            {/* Details List */}
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="font-medium">Experience:</span>
                <span className="text-right">{title || "Kayaking"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span className="text-right">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span className="text-right">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Qty:</span>
                <span className="text-right">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span className="text-right">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Taxes:</span>
                <span className="text-right">₹{tax}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Discount:</span>
                  <span className="text-right">-₹{discount}</span>
                </div>
              )}
            </div>

            <hr className="border-gray-300 my-3" />

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-lg text-gray-900 text-right">
                ₹{total - discount}
              </span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
