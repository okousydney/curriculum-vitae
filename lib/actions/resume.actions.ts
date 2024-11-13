"use server";

import { revalidatePath } from "next/cache";
import Resume from "../database/models/resume.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../helpers";
import User from "../database/models/user.model";

// CREATE
export async function createResume(
  userId: string,
  resumeData: CreateResumeParams
) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const newResume = await Resume.create({ ...resumeData, user: author._id });

    return JSON.parse(JSON.stringify(newResume));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getAllResume() {
  try {
    await connectToDatabase();

    const resume = await Resume.find().populate({
      path: "user",
      model: User,
      select: "firstName lastName email",
    });

    if (!resume) throw new Error("Resume not found");

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    handleError(error);
  }
}

export async function getResumeById(resumeId: string) {
  try {
    await connectToDatabase();

    const resume = await Resume.findById(resumeId).populate({
      path: "user",
      model: User,
      select: "firstName lastName email",
    });
    if (!resume) throw new Error("Resume not found");

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    handleError(error);
  }
}

export async function getResumeByUserId(userId: string) {
  try {
    await connectToDatabase();

    const resume = await Resume.find({ user: userId });

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateResume(
  resumeId: string,
  resumeData: UpdateResumeParams
) {
  try {
    await connectToDatabase();

    const updatedResume = await Resume.findByIdAndUpdate(resumeId, resumeData, {
      new: true, // Retourne le document mis à jour
    });

    if (!updatedResume) throw new Error("Resume update failed");

    return JSON.parse(JSON.stringify(updatedResume));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteResume(resumeId: string) {
  try {
    await connectToDatabase();

    const deletedResume = await Resume.findByIdAndDelete(resumeId);

    revalidatePath("/");

    return deletedResume ? JSON.parse(JSON.stringify(deletedResume)) : null;
  } catch (error) {
    handleError(error);
  }
}
