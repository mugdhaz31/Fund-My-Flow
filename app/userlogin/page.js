"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "../context/DarkModeContext";
import { signIn } from "next-auth/react";

function UserLogin() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    identifier: "", 
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      identifier: loginData.identifier,
      password: loginData.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-[#E3F2FD] text-gray-900"}>
      <div className="flex flex-col items-center justify-center min-h-screen p-10">
        <form  className={`flex flex-col gap-4 w-full max-w-md p-6 rounded-lg shadow-lg ${ darkMode ? "bg-gray-700 text-gray-300" : "bg-[#EAF4FC] text-gray-800"  }`}  onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold flex justify-center">Sign In</h2>
          <input  type="text"  placeholder="Username or Email"  value={loginData.identifier}  onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}  className="border rounded p-2"  required/>
          <input  type="password"  placeholder="Password" value={loginData.password}  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}  className="border rounded p-2"  required/>
          <button  type="submit"  className="flex-1 p-3  rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transform transition-transform duration-300 hover:scale-105">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
