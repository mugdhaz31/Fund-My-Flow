"use client";
import { useDarkMode } from "./context/DarkModeContext";
import Link from 'next/link';

export default function Home() {
  const { darkMode } = useDarkMode();
  
  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-[#E3F2FD] text-gray-900"}>
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <img src="/logo.png" alt="Logo"  className="h-48 w-48 mx-auto "/>
          <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 ">Fund My Flow</h4>
          <p className="mt-4 max-w-3xl mx-auto px-4 ">
            Fund My Flow allows creators to receive support from their fans and followers. Whether you&apos;re an artist, writer, musician, or influencer, fund your passion and fuel your creativity with easy contributions. Join now and make your creative journey sustainable!
          </p>
        </div>
      </div>

      <div className={darkMode ? "bg-white h-px opacity-10" : "bg-black h-1 opacity-10"}></div>

      <div className="py-16 text-center">
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-8">Support Your Favorite Creators</h3>
        <p className="mt-4 text-lg max-w-3xl mx-auto mb-10 px-4">Fund My Flow makes it easy for creators to receive support from their audience. Whether you&apos;re an artist, writer, musician, or influencer, your fans can contribute to your creative journey.</p>
        <div className="flex gap-7 justify-center">
          <Link href="/login"><button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transform transition-transform duration-300 hover:scale-105">Start Supporting Today</button> </Link>
        <Link href="/about"><button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transform transition-transform duration-300 hover:scale-105">Read More</button></Link>
        </div>
      </div>

      <div className={darkMode ? "bg-white h-px opacity-10" : "bg-black h-1 opacity-10"}></div>

      <div className="py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4">Designed for creators,</h1>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-gray-500">not for businesses.</h1>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {/* Feature 1 */}
        <div className="flex items-start space-x-3">
          <span className="text-green-600 text-xl">✓</span>
          <p className="text-lg">We don&apos;t call them &quot;customers&quot; or transactions. They are your <span className="font-semibold">supporters</span>.</p>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start space-x-3">
          <span className="text-green-600 text-xl">✓</span>
          <p className="text-lg">You have <span className="font-semibold">100% ownership</span> of your supporters. We never email them, and you can export the list any time you like.</p>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start space-x-3">
          <span className="text-green-600 text-xl">✓</span>
          <p className="text-lg">You get to <span className="font-semibold">talk to a human</span> for help, or if you just like some advice to hit the ground running.</p>
        </div>

        {/* Feature 4 */}
        <div className="flex items-start space-x-3">
          <span className="text-green-600 text-xl">✓</span>
          <p className="text-lg">You get paid instantly to your bank account. <span className="font-semibold">No more 30-day delays</span>.</p>
        </div>
      </div>

      <div className={darkMode ? "bg-white h-px opacity-10" : "bg-black h-1 opacity-10"}></div>

      {/*How it Works Section for Creators*/}
      <div className="py-16 mx-auto container">
        <h2 className="text-3xl font-semibold mb-8 text-center">How It Works for Creators</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28  transform transition-transform duration-300 hover:scale-110" src="/create.webp" alt="Create Profile" />
              <h3 className="text-xl font-semibold mt-2">Create Your Profile</h3>
            </div>
            <p className="text-gray-600">Set up your profile with details about your work, goals, and ways fans can support you.</p>
          </div>
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28 transform transition-transform duration-300 hover:scale-110" src="/share.webp" alt="Share Profile" />
              <h3 className="text-xl font-semibold mt-2">Share Your Profile</h3>
            </div>
            <p className="text-gray-600">Share your profile link with fans on social media or your website to reach potential supporters.</p>
          </div>
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28 transform transition-transform duration-300 hover:scale-110" src="/support.webp" alt="Receive Support" />
              <h3 className="text-xl font-semibold mt-2">Receive Support</h3>
            </div>
            <p className="text-gray-600">Receive contributions directly from your supporters, helping you focus on your creative journey.</p>
          </div>
        </div>
      </div>

      <div className={darkMode ? "bg-white h-px opacity-10" : "bg-black h-1 opacity-10"}></div>

      {/*How it Works Section for Donators*/}
      <div className="py-16 mx-auto container">
        <h2 className="text-3xl font-semibold mb-8 text-center">How It Works for Donators</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28 transform transition-transform duration-300 hover:scale-110" src="/chose.webp" alt="Choose" />
              <h3 className="text-xl font-semibold mt-2">Choose a Creator</h3>
            </div>
            <p className="text-gray-600">Explore the profiles of your favorite creators across various categories.</p>
          </div>
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28 transform transition-transform duration-300 hover:scale-110" src="/coontribute.webp" alt="Contribute" />
              <h3 className="text-xl font-semibold mt-2">Contribute</h3>
            </div>
            <p className="text-gray-600">Support your favorite creator with one-time or recurring contributions.</p>
          </div>
          <div className="item space-y-3 text-center max-w-xs">
            <div className="flex flex-col items-center">
              <img className="bg-slate-400 rounded-full p-2 w-28 transform transition-transform duration-300 hover:scale-110" src="/connected.webp" alt="Stay Connected" />
              <h3 className="text-xl font-semibold mt-2">Stay Connected</h3>
            </div>
            <p className="text-gray-600">Follow creators to stay updated on their latest projects and works.</p>
          </div>
        </div>
      </div>

      <div className={darkMode ? "bg-white h-px opacity-10" : "bg-black h-1 opacity-10"}></div>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="mt-4 text-lg mb-6">Sign up today and start receiving support for your creative work!</p>
        <Link href="/login">
          <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transform transition-transform duration-300 hover:scale-105">
            Get started
          </button>
        </Link>
      </section>
    </div>
  );
}
