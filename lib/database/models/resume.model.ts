import { Schema, model, models } from "mongoose";

export interface IResume {
  _id?: string;
  user: {
    _id: string;
    firstName?: string;
    lastName?: string;
  };
  title: string;
  summary?: string;
  experiences: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
  certifications: ICertification[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Interfaces pour les sous-documents de Resume

export interface IExperience {
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
}

export interface ISkill {
  name: string;
  level?: string; // Par exemple : "Débutant", "Intermédiaire", "Avancé"
}

export interface ILanguage {
  language: string;
  proficiency?: string; // Par exemple : "Courant", "Intermédiaire", etc.
}

export interface ICertification {
  title: string;
  issuer?: string;
  date?: Date;
}

const ResumeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  experiences: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      fieldOfStudy: { type: String },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
      level: { type: String },
    },
  ],
  languages: [
    {
      language: { type: String, required: true },
      proficiency: { type: String },
    },
  ],
  certifications: [
    {
      title: { type: String, required: true },
      issuer: { type: String },
      date: { type: Date },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pour mettre à jour le champ updatedAt avant chaque sauvegarde
ResumeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Resume = models?.Resume || model("Resume", ResumeSchema);

export default Resume;
