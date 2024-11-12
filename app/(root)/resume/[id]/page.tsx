"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import { getResumeById } from "@/lib/actions/resume.actions";
import Image from "next/image";
import { IResume } from "@/lib/database/models/resume.model";
import { FadeLoader } from "react-spinners";

const ResumePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [resumeData, setResumeData] = useState<IResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadResume = async () => {
        try {
          const data = await getResumeById(id as string);
          setResumeData(data);
        } catch (err) {
          console.error(err);
          setError("Failed to load resume data.");
        }
      };
      loadResume();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!resumeData) {
    return (
      <div className="flex justify-center items-center w-full h-lvh">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-indigo-100 text-indigo-950 rounded-lg shadow-lg space-y-8">
      <div className="text-center">
        {resumeData.photo && (
          <Image
            src={resumeData.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto shadow-md mb-4"
            width={32}
            height={32}
          />
        )}
        <h1 className="text-3xl font-bold">{resumeData.title}</h1>
      </div>

      <div className="text-lg text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="bg-indigo-50 p-4 rounded-md shadow-inner">
          {resumeData.summary}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Professional Experiences
          </h2>
          {resumeData.experiences.map((exp, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-inner bg-indigo-50 space-y-2 mb-2"
            >
              <h3 className="text-lg font-medium">
                {exp.jobTitle} - {exp.company}
              </h3>
              <p className="text-sm text-gray-500">
                {exp.startDate?.toString()} -{" "}
                {exp.endDate?.toString() || "Present"}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-inner bg-indigo-50 space-y-2 mb-2"
            >
              <h3 className="text-lg font-medium">{edu.institution}</h3>
              <p className="text-sm text-gray-500">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="text-sm text-gray-500">
                {edu.startDate?.toString()} -{" "}
                {edu.endDate?.toString() || "Present"}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="space-y-2">
            {resumeData.skills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between bg-indigo-50 p-3 rounded-md shadow-inner mb-2 w-1/3"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-500">{skill.level}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <ul className="space-y-2">
            {resumeData.languages.map((language, index) => (
              <li
                key={index}
                className="flex justify-between bg-indigo-50 p-3 rounded-md shadow-inner mb-2 w-1/3"
              >
                <span className="font-medium">{language.language}</span>
                <span className="text-gray-500">{language.proficiency}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ResumePage;
