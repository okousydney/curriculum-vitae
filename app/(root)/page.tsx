"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Resume = {
  _id: string;
  title: string;
  summary: string;
  photo: string | null;
};

const HomePage = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const response = await fetch("/api/resumes");
      const data = await response.json();
      setResumes(data);
      setFilteredResumes(data);
    };
    fetchResumes();
  }, []);

  useEffect(() => {
    const filtered = resumes.filter(
      (resume) =>
        resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResumes(filtered);
  }, [searchTerm, resumes]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-indigo-700">
        Discover all resumes of Curriculum-Vitae members
      </h1>

      {/* Search Bar*/}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search resumes by title or summary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border rounded-md shadow-sm bg-indigo-50 focus:outline-none"
        />
      </div>

      {/* Liste de CV */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredResumes.map((resume) => (
          <Link key={resume._id} href={`/resume/${resume._id}`}>
            <div className="p-4 bg-indigo-100 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              {/* Photo du CV */}
              {resume.photo ? (
                <Image
                  src={resume.photo}
                  alt={`${resume.title} photo`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-full mx-auto"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto" />
              )}

              {/* Titre du CV */}
              <h3 className="text-lg font-semibold text-center mt-4 text-indigo-900">
                {resume.title}
              </h3>

              {/* Résumé */}
              <p className="text-center text-sm text-indigo-700 mt-2">
                {resume.summary.length > 100
                  ? resume.summary.slice(0, 100) + "..."
                  : resume.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
