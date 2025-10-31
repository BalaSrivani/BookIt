import { Link } from "react-router-dom";

export default function ExperienceCard({ exp }: { exp: any }) {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex gap-4 flex-col">
      {/* Image */}
      <img
        src={exp.image}
        alt={exp.title}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-2">
        <div>
          {/* Title + Location */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
            <span className="text-xs bg-gray-100 border border-gray-300 px-1 py-1 rounded-md text-gray-600">
              {exp.place || "Location"}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {exp.description || "Curated small group experience with certified guide."}
          </p>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-2">
          <p className=" text-gray-800">
            From <span className="font-semibold text-black text-base text-l">₹{exp.price}</span>
          </p>
          <Link
            to={`/details/${exp._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-4 py-2 rounded-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
