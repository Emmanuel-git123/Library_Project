import React from "react";

const publications = [
  {
    id: 1,
    title: "HelperVortexPreziLeetcodecodingbogi",
    authors: "Alice Johnson",
    year: "2025",
    image: "/images/paper1.jpg",
    itemType: "	Thesis (Btech)",
    Supervisor: "	Dr. Robert Smith",
    Subject: "	Calculus"
  },
  {
    id: 2,
    title: "Modern Poetry and its Socio-Cultural Impact",
    authors: "Sophia Brown",
    year: "2025",
    image: "/images/paper2.jpg",
    itemType: "Thesis (MA)",
    Supervisor: "Dr. John Williams",
    Subject: "Poetry"
  },
  {
    id: 3,
    title: "Optimization of Graph Algorithms for Large-Scale Networks",
    authors: "Alice Johnson",
    year: "2025",
    image: "/images/paper3.jpg",
    itemType: "	Thesis (Btech)",
    Supervisor: "	Dr. Robert Smith",
    Subject: "		Graph Algorithms"
  },
  {
    id: 4,
    title: "Applications of Linear Algebra in Cryptography",
    authors: "Emily Davis",
    year: "2024",
    image: "/images/paper4.jpg",
    itemType: "	Thesis (MSc)",
    Supervisor: "	Dr. John Williams",
    Subject: "	Linear Algebra"
  }
];

export default function RecentPublications() {
  return (
    <div className="px-10 py-4">
      <div className="flex justify-center font-bold mb-2 mt-5 h-10 text-2xl">Recent Research Publications</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="flex bg-white border-2 rounded-xl overflow-hidden transition"
          >
            {/* <img
              src={pub.image}
              alt={pub.title}
              className="w-32 object-cover"
            /> */}

            <div className="p-4 flex flex-col justify-between">
              <h3 className="font-semibold text-lg">
                {pub.title}
              </h3>

              <p className="text-sm text-gray-600">
                {pub.authors}
              </p>

              <p className="text-sm text-gray-600">
                {pub.Supervisor}
              </p>

              <p className="text-xs text-gray-500">
                Published: {pub.year}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}