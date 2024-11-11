"use client";
import { useActionState, useState } from "react";
import { IUser } from "@/lib/database/models/user.model";
import { useRouter } from "next/navigation";
import { createResume } from "@/lib/actions/resume.actions";

const ResumeForm = ({ user }: { user: IUser }) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [experiences, setExperiences] = useState([
    { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "", level: "" }]);
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "" },
  ]);
  const [certifications, setCertifications] = useState([
    { title: "", issuer: "", date: "" },
  ]);
  const [education, setEducation] = useState([
    { institution: "", degree: "", startDate: "", endDate: "" },
  ]);
  const [photo, setPhoto] = useState<string | null>(null);
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
      certifications,
    };

    try {
      if (user?._id) {
        const newResume = await createResume(user._id, resumeData);
        if (newResume) {
          router.push(`/resumes/${newResume._id}`);
        }
        return "Resume successfully created";
      }
      return "Unauthorized user";
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the resume.");
    }
  };

  const [message, submitAction, isPending] = useActionState(addResume, "");

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
    <div className="container mx-auto p-6 bg-indigo-200 text-indigo-950 rounded-lg shadow-lg w-2/3">
      <h1 className="text-3xl font-bold text-center mb-6">Créer mon CV</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form action={submitAction} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-1">Titre du CV</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-indigo-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">Résumé</label>
          <textarea
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-indigo-50"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Expériences</h3>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-inner bg-indigo-100 space-y-2"
            >
              <input
                type="text"
                placeholder="Poste"
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
                placeholder="Entreprise"
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
                value={experience.startDate}
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
                value={experience.endDate}
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
                onClick={() => removeItem(setExperiences, experiences, index)}
                className="text-red-500 mt-2"
              >
                Supprimer cette expérience
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
            Ajouter une expérience
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Compétences</h3>
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Compétence"
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
                placeholder="Niveau (e.g., Débutant, Avancé)"
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
                Supprimer cette compétence
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(setSkills, { name: "", level: "" })}
            className="mt-2 text-blue-500"
          >
            Ajouter une compétence
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Langues</h3>
          {languages.map((language, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Langue"
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
                placeholder="Niveau (e.g., Courant, Bilingue)"
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
                Supprimer cette langue
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
            Ajouter une langue
          </button>
        </div>

        {/* Ajout des autres sections similaires pour certifications, éducation, photo, etc. */}

        <div>
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-400 transition ${
              isPending && "opacity-50"
            }`}
            disabled={isPending}
          >
            {isPending ? "Création en cours..." : "Créer le CV"}
          </button>
        </div>
      </form>
      <p className="text-center mt-4 font-medium">{message}</p>
    </div>
  );
};

export default ResumeForm;
