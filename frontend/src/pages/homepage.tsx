import { useEffect, useState } from "react";
import { api } from "../axios";
import ExperienceCard from "../components/exeprienceCard";


export default function Home({ searchQuery }: { searchQuery: string }) {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/experiences")
      .then((res) => setExperiences(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const filtered = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8">
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No experiences found for “{searchQuery}”
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
