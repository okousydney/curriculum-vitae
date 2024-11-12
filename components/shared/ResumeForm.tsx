/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useActionState, useState } from "react";
import { IUser } from "@/lib/database/models/user.model";
import { useRouter } from "next/navigation";
import {
  createResume,
  deleteResume,
  updateResume,
} from "@/lib/actions/resume.actions";
import Image from "next/image";
import { FormActions, FormValues } from "@/lib/constants";
import { IResume } from "@/lib/database/models/resume.model";

const ResumeForm = ({
  user,
  data,
  action,
}: {
  user: IUser;
  data?: IResume;
  action: FormActions;
}) => {
  const [title, setTitle] = useState<string>(data?.title || "");
  const [summary, setSummary] = useState<string>(data?.summary || "");
  const [experiences, setExperiences] = useState(
    data?.experiences || [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
  );

  const [skills, setSkills] = useState(
    data?.skills || [{ name: "", level: "" }]
  );
  const [languages, setLanguages] = useState(
    data?.languages || [{ language: "", proficiency: "" }]
  );
  const [education, setEducation] = useState(
    data?.education || [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]
  );
  const [photo, setPhoto] = useState<string | undefined>(
    data?.photo || undefined
  );
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const addResume = async () => {
    const resumeData = {
      title,
      photo,
      summary,
      experiences,
      education,
      skills,
      languages,
    };

    try {
      if (user?._id) {
        if (action === FormActions.CREATE) {
          const newResume = await createResume(user._id, resumeData);
          if (newResume) {
            router.push(`/resume/${newResume._id}`);
          }
          return "Resume successfully created";
        } else if (action === FormActions.UPDATE && !!data?._id) {
          const newResume = await updateResume(data?._id, resumeData);
          if (newResume) {
            router.push(`/resume/${newResume._id}`);
          }
          return "Resume successfully updated";
        }
      }
      return "Unauthorized user";
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the resume.");
    }
  };

  const [message, submitAction, isPending] = useActionState(addResume, "");

  const deleteMethod = async () => {
    try {
      if (action === FormActions.UPDATE && !!data?._id) {
        await deleteResume(data?._id);
        return "Resume successfully deleted";
      }
      return "No resume to delete";
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the resume.");
    }
  };

  const [messageDelete, deleteAction, isDeleting] = useActionState(
    deleteMethod,
    ""
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string); // Set the base64 string as photo
      };
      reader.readAsDataURL(file);
    }
  };

  // Functions to handle adding/removing items for each dynamic field
  const handleInputChange = (
    index: number,
    field: string,
    value: string,
    setState: any,
    items: any[]
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setState(updatedItems);
  };

  const addItem = (setState: any, itemTemplate: any) => {
    setState((prevItems: any) => [...prevItems, itemTemplate]);
  };

  const removeItem = (setState: any, items: any[], index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setState(updatedItems);
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-indigo-200 text-indigo-950 rounded-lg shadow-lg mt-2">
      <form action={submitAction} className="space-y-6 ">
        <section className="flex lg:flex-row flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-lg font-medium mb-1">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-1 block w-full"
              />
              {photo && (
                <div className="mt-4">
                  <Image
                    src={photo}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
                    width={32}
                    height={32}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">
                Resume Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-indigo-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1">Summary</label>
              <textarea
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-indigo-50"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Languages</h3>
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-inner bg-indigo-100 space-y-2 mb-2"
                >
                  <input
                    type="text"
                    placeholder="Language"
                    value={language.language}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "language",
                        e.target.value,
                        setLanguages,
                        languages
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="text"
                    placeholder="Level (e.g., Fluent, Bilingual)"
                    value={language.proficiency}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "proficiency",
                        e.target.value,
                        setLanguages,
                        languages
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setLanguages, languages, index)}
                    className="text-red-500 mt-2"
                  >
                    Remove language
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addItem(setLanguages, { language: "", proficiency: "" })
                }
                className="mt-2 text-blue-500"
              >
                Add a language
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">
                Professional Experiences
              </h3>
              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-inner bg-indigo-100 space-y-2 mb-2"
                >
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={experience.jobTitle}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "jobTitle",
                        e.target.value,
                        setExperiences,
                        experiences
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={experience.company}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "company",
                        e.target.value,
                        setExperiences,
                        experiences
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="date"
                    value={
                      experience.startDate === ""
                        ? experience.startDate
                        : new Date(experience.startDate)
                            .toISOString()
                            .split("T")[0]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "startDate",
                        e.target.value,
                        setExperiences,
                        experiences
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="date"
                    value={
                      experience.endDate && experience.endDate != ""
                        ? new Date(experience.endDate)
                            .toISOString()
                            .split("T")[0]
                        : experience.endDate
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "endDate",
                        e.target.value,
                        setExperiences,
                        experiences
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <textarea
                    placeholder="Description"
                    value={experience.description}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "description",
                        e.target.value,
                        setExperiences,
                        experiences
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(setExperiences, experiences, index)
                    }
                    className="text-red-500 mt-2"
                  >
                    Remove experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addItem(setExperiences, {
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="mt-2 text-blue-500"
              >
                Add an experience
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Education</h3>
              {education.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-inner bg-indigo-100 space-y-2 mb-2"
                >
                  <input
                    type="text"
                    placeholder="Institution"
                    value={item.institution}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "institution",
                        e.target.value,
                        setEducation,
                        education
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={item.degree}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "degree",
                        e.target.value,
                        setEducation,
                        education
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <textarea
                    placeholder="Study"
                    value={item.fieldOfStudy}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "fieldOfStudy",
                        e.target.value,
                        setEducation,
                        education
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="date"
                    value={
                      item.startDate === ""
                        ? item.startDate
                        : new Date(item.startDate).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "startDate",
                        e.target.value,
                        setEducation,
                        education
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="date"
                    value={
                      item.endDate && item.endDate != ""
                        ? new Date(item.endDate).toISOString().split("T")[0]
                        : item.endDate
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "endDate",
                        e.target.value,
                        setEducation,
                        education
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(setEducation, experiences, index)}
                    className="text-red-500 mt-2"
                  >
                    Remove experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addItem(setEducation, {
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="mt-2 text-blue-500"
              >
                Add an experience
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Skills</h3>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-inner bg-indigo-100 space-y-2 mb-2"
                >
                  <input
                    type="text"
                    placeholder="Skill"
                    value={skill.name}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "name",
                        e.target.value,
                        setSkills,
                        skills
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <input
                    type="text"
                    placeholder="Level (e.g., Beginner, Advanced)"
                    value={skill.level}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "level",
                        e.target.value,
                        setSkills,
                        skills
                      )
                    }
                    className="w-full border p-2 rounded-md bg-indigo-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setSkills, skills, index)}
                    className="text-red-500 mt-2"
                  >
                    Remove skill
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(setSkills, { name: "", level: "" })}
                className="mt-2 text-blue-500"
              >
                Add a skill
              </button>
            </div>

            {/* Ajout des autres sections similaires pour certifications, éducation, photo, etc. */}
          </div>
        </section>

        <div>
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-400 transition ${
              isPending && "opacity-50"
            }`}
            disabled={isPending}
          >
            {isPending ? FormValues[action].loading : FormValues[action].button}
          </button>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        </div>
        {action === FormActions.UPDATE && (
          <div>
            <button
              className={`w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-indigo-400 transition ${
                isPending && "opacity-50"
              }`}
              disabled={isDeleting}
              onClick={deleteAction}
            >
              {isDeleting ? "Deleting ..." : "Delete resume"}
            </button>
          </div>
        )}
      </form>
      <p className="text-center mt-4 font-medium">{message}</p>
      <p className="text-center mt-4 font-medium">{messageDelete}</p>
    </div>
  );
};

export default ResumeForm;
