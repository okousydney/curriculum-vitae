"use client";

import { getUserById, updateUser } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Profile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    photo: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserById(userId);
        setUser(userProfile);
        setForm({
          email: userProfile.email,
          username: userProfile.username,
          photo: userProfile.photo,
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userId, form);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center w-full h-lvh">
        <FadeLoader />
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My profile</h1>
      <div className="flex flex-col items-center">
        <Image
          src={user.photo}
          alt={`${user.username}'s profile`}
          className="w-32 h-32 rounded-full mb-4"
          width={64}
          height={64}
        />
        {!isEditing ? (
          <>
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">
              {user.firstName} {user.lastName}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md"
            >
              Editer Profil
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md bg-indigo-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md bg-indigo-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md bg-indigo-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md bg-indigo-50"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Annuler
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
