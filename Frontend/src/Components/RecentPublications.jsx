import React from "react";

const thesisList = [
  {
    id: 1,
    title: "AI Based Library Recommendation System",
    author: "Vedanth Boga",
    year: "2025",
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Blockchain Based Voting System",
    author: "Ananya Sharma",
    year: "2024",
    department: "Computer Science",
  },
  {
    id: 3,
    title: "IoT Smart Agriculture Monitoring",
    author: "Rahul Kumar",
    year: "2024",
    department: "Electronics",
  },
];

const RecentPublications = () => {
  return (
    <section className="max-w-9xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Recent Thesis Publications
      </h2>
      <div className="flex flex-col gap-6">
        {thesisList.map((thesis) => (
          <div key={thesis.id} className="bg-white shadow-lg rounded-xl overflow-hidden border-2 transition">
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {thesis.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {thesis.author}
              </p>
              <p className="text-sm text-gray-500">
                {thesis.department} • {thesis.year}
              </p>
              <button className="mt-4 text-blue-600 hover:underline hover:cursor-pointer">
                View Thesis →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPublications;