import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../axios";

interface ExperienceType {
  _id: string;
  title: string;
  description: string;
  place: string;
  price: number;
  image: string;
  about: string;
}

interface SlotType {
  _id: string;
  date: string;
  time: string;
  capacity: number;
  remaining: number;
}

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState<{ experience: ExperienceType; slots: SlotType[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
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

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (!exp) return <p className="mt-10 text-center">Experience not found</p>;

  const { experience, slots } = exp;

  const uniqueDates: string[] = [...new Set(slots.map((slot) => slot.date))];
  const filteredSlots: SlotType[] = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
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
    <div className="min-h-screen px-4 py-8 bg-white md:px-12">
      {/* 🔙 Back Arrow on Top */}
      <h2
        className="flex items-center gap-2 mb-8 text-xl font-semibold text-gray-800 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <span className="text-2xl">←</span>
        <span>Back</span>
      </h2>

      <div className="flex flex-col max-w-6xl gap-8 mx-auto md:flex-row">
        {/* LEFT SECTION */}
        <div className="w-full md:w-2/3">
          <img
            src={experience.image}
            alt={experience.title}
            className="object-cover w-full shadow-md h-72 rounded-xl"
          />

          <div className="mt-4 space-y-4">
            <h2 className="text-2xl font-bold">{experience.title}</h2>
            <p className="text-gray-600">{experience.description}</p>

            {/* Choose Date */}
            <div>
              <h3 className="mb-2 font-semibold">Choose date</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueDates.length > 0 ? (
                  uniqueDates.map((date: string): JSX.Element => (
                    <button
                      key={date}
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
                  <p className="text-sm text-gray-500">
                    No dates available for booking.
                  </p>
                )}
              </div>
            </div>

            {/* Choose Time */}
            <div>
              <h3 className="mb-2 font-semibold">Choose time</h3>
              {selectedDate ? (
                <div className="flex flex-wrap gap-2">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot: SlotType): JSX.Element => (
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
                    <p className="text-sm text-gray-500">
                      No time slots for this date.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Please select a date first.
                </p>
              )}
            </div>

            {/* About Section */}
            <div>
              <h3 className="mt-4 font-semibold">About</h3>
              <p className="text-sm text-gray-500">
                {experience.about || "No additional details available."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="sm:w-full md:w-1/3">
          <div className="sticky p-5 border shadow-md rounded-xl bg-gray-50 top-6">
            <h3 className="mb-3 text-lg font-semibold">Booking Summary</h3>

            <div className="flex justify-between text-gray-700">
              <span>Starts at</span>
              <span>₹{experience.price}</span>
            </div>

            <div className="flex justify-between mt-2 text-gray-700">
              <span>Quantity</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 border rounded hover:bg-gray-100"
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

            <div className="my-3 border-t"></div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {!selectedDate || !selectedSlot ? (
              <p className="mt-2 text-sm text-center text-gray-500">
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
