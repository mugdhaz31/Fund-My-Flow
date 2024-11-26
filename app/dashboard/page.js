"use client";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { darkMode } = useDarkMode();
  const { data: session, update } = useSession();
  const router = useRouter();

  const [form, setform] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
  });

  useEffect(() => {
    console.log(session)
    if (!session) {
      router.push("/login");
    }
    else {
      getData()
    }
  }, [session, router]);

  const getData = async () => {
    let u = await fetchser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let a = await updateProfile(form, session.user.name)
    toast("Profile Updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
}

  if (!session || darkMode === undefined) {
    return null;
  }

  return (
    <div  className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${ darkMode ? "bg-gray-900 text-white" : "bg-[#E3F2FD] text-gray-900" }`}>
        <ToastContainer />
      <h1 className="text-center mb-8 text-3xl font-bold">Welcome to your Dashboard</h1>
      <form className={`max-w-2xl mx-auto ${darkMode? "bg-gray-800 text-white":"bg-[#cce4f8] text-gray-900"} p-6 rounded-lg shadow-md`} action={handleSubmit}>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Username", name: "username", type: "text" },
          { label: "Profile Picture (Url)", name: "profilepic", type: "text" },
          { label: "Cover Picture (Url)", name: "coverpic", type: "text" },
        ].map((input) => (
          <div key={input.name} className="my-4">
            <label  htmlFor={input.name} className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900" }`}>{input.label}</label>
            <input value={form[input.name] || ""} onChange={handleChange} type={input.type} name={input.name} id={input.name} className={`block w-full p-3 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 ${darkMode ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600" : "bg-[#eaf6ff] text-gray-900 placeholder-gray-500 border-gray-300" }`}  />
          </div>
        ))}
        <div className="mt-6 flex justify-center">
          <button type="submit" className="w-fit p-3 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transform transition-transform duration-300 hover:scale-105">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;