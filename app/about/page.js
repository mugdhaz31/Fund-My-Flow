"use client";
import React,  { useEffect }  from 'react';
import { useDarkMode } from "../context/DarkModeContext";

const About = () => {
    const { darkMode } = useDarkMode();
    useEffect(() => {
        console.log('Rendered About Page');
    }, []);
    return (
        <>
            <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900 text-white" : "bg-[#E3F2FD] text-gray-900"}`}>
                <h1 className="text-4xl font-bold mb-6 text-center">About Fund My Flow</h1>
                <p className="text-lg mb-10 text-center max-w-3xl mx-auto leading-relaxed">
                Fund My Flow is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It&apos;s a space where your fans can directly contribute to your creative endeavors by funding to your flow. Unlock the potential of your fanbase and bring your projects to life.
                </p>

                <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-center">How It Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center">
        <div
            className={`flex items-center rounded-lg shadow-lg p-6 w-full max-w-sm transition-transform duration-300 hover:scale-105 ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-[#BBDEFB] text-gray-700"
            }`}
        >
            <img className="w-20 h-20 rounded-full mr-6" src="/group.gif" alt="Fans Want to Collaborate" />
            <div>
                <h3 className="text-xl font-semibold mb-2">Fans Want to Collaborate</h3>
                <p className="text-sm">Your fans are enthusiastic about collaborating with you on your projects.</p>
            </div>
        </div>
        <div
            className={`flex items-center rounded-lg shadow-lg p-6 w-full max-w-sm transition-transform duration-300 hover:scale-105 ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-[#BBDEFB] text-gray-700"
            }`}
        >
            <img className="w-20 h-20 rounded-full mr-6" src="/coin.gif" alt="Support Through Chai" />
            <div>
                <h3 className="text-xl font-semibold mb-2">Support Through Funding</h3>
                <p className="text-sm">Receive support from your fans , directly contributing to your project funding.</p>
            </div>
        </div>
    </div>
</section>



                <section className="mb-10">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {["For Creators", "For Fans", "Community Benefits"].map((title, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${
                                    darkMode ? "bg-gray-800 text-gray-300" : "bg-[#BBDEFB] text-gray-700"
                                }`}
                            >
                                <h3 className="text-xl font-bold mb-4">{title}</h3>
                                <ul className="list-disc pl-4 text-sm space-y-2">
                                    {title === "For Creators" && (
                                        <>
                                            <li>Direct financial support from your fanbase</li>
                                            <li>Engage with your fans on a more personal level</li>
                                            <li>Access to a platform tailored for creative projects</li>
                                        </>
                                    )}
                                    {title === "For Fans" && (
                                        <>
                                            <li>Directly contribute to the success of your favorite creators</li>
                                            <li>Exclusive rewards and perks for supporting creators</li>
                                            <li>Be part of the creative process and connect with creators</li>
                                        </>
                                    )}
                                    {title === "Community Benefits" && (
                                        <>
                                            <li>Interact with a supportive community of like-minded individuals</li>
                                            <li>Participate in events and discussions</li>
                                            <li>Receive valuable feedback and encouragement</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-6 text-center">Join Our Community</h2>
                    <p className="text-lg text-center max-w-2xl mx-auto leading-relaxed">
                        Whether you&apos;re a creator looking to fund your projects or a fan eager to support and connect, Fund My Flow is your platform. Start your journey today!
                    </p>
                </section>
            </div>
        </>
    );
};

export default About;
