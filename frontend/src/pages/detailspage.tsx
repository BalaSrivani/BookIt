import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../axios";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    api
      .get(`/experiences/${id}`)
      .then((res) => {
        console.log("Response Data:", res.data);
        setExp(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!exp) return <p className="text-center mt-10">Experience not found</p>;

  const { experience, slots } = exp;

  const uniqueDates = [...new Set(slots.map((slot: any) => slot.date))];
  const filteredSlots = selectedDate
    ? slots.filter((slot: any) => slot.date === selectedDate)
    : [];

  const tax = 59;
  const subtotal = experience.price * quantity;
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time before confirming.");
      return;
    }

    navigate(`/checkout/${id}`, {
      state: {
        experienceId: experience._id,
        slotId: selectedSlot._id,
        title: experience.title,
        price: experience.price,
        selectedDate,
        selectedTime: selectedSlot.time,
        quantity,
        subtotal,
        tax,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-8">
      {/* 🔙 Back Arrow on Top */}
      <h2
        className="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <span className="text-2xl">←</span>
        <span>Back</span>
      </h2>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* LEFT SECTION */}
        <div className="md:w-2/3 w-full">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />

          <div className="mt-4 space-y-4">
            <h2 className="text-2xl font-bold">{experience.title}</h2>
            <p className="text-gray-600">{experience.description}</p>

            {/* Choose Date */}
            <div>
              <h3 className="font-semibold mb-2">Choose date</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueDates.length > 0 ? (
                  uniqueDates.map((date) => (
                    <button
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      className={`border rounded-lg px-3 py-1 text-sm transition ${
                        selectedDate === date
                          ? "bg-yellow-400 text-black font-semibold"
                          : "hover:bg-yellow-100"
                      }`}
                    >
                      {date}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No dates available for booking.
                  </p>
                )}
              </div>
            </div>

            {/* Choose Time */}
            <div>
              <h3 className="font-semibold mb-2">Choose time</h3>
              {selectedDate ? (
                <div className="flex flex-wrap gap-2">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot: any) => (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`border rounded-lg px-3 py-1 text-sm transition ${
                          selectedSlot?._id === slot._id
                            ? "bg-yellow-400 text-black font-semibold"
                            : "hover:bg-yellow-100"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No time slots for this date.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Please select a date first.
                </p>
              )}
            </div>

            {/* About Section */}
            <div>
              <h3 className="font-semibold mt-4">About</h3>
              <p className="text-gray-500 text-sm">
                {experience.about || "No additional details available."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Booking Summary) */}
        <div className="sm:w-full md:w-1/3">
          <div className="border rounded-xl shadow-md p-5 bg-gray-50 sticky top-6">
            <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>

            <div className="flex justify-between text-gray-700">
              <span>Starts at</span>
              <span>₹{experience.price}</span>
            </div>

            {/* Quantity Control */}
            <div className="flex justify-between mt-2 text-gray-700">
              <span>Quantity</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="border px-2 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="border px-2 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mt-2 text-gray-700">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {!selectedDate || !selectedSlot ? (
              <p className="text-center text-gray-500 text-sm mt-2">
                Select a date and time to continue
              </p>
            ) : null}

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot}
              className={`w-full mt-4 font-semibold py-2 rounded-lg transition ${
                !selectedDate || !selectedSlot
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
