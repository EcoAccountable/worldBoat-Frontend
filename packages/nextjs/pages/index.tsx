import Link from "next/link";
import type { NextPage } from "next";
import { DocumentMagnifyingGlassIcon, GlobeAltIcon, LightBulbIcon, UsersIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />

      <div className="animated-background flex flex-col min-h-screen justify-center pt-10 text-white">
        <main className="flex-grow">
          <div className="px-5 z-10">
            <h1 className="text-center mb-8">
              <span className="block text-2xl mb-2">Welcome to</span>
              <span className="block text-6xl font-extrabold tracking-tight">WorldBoat</span>
            </h1>
            <p className="text-center text-xl max-w-3xl mx-auto">
              Join us in our journey to make the world a better place.
              <br />
              Collaborate, Contribute, and Create Impact.
            </p>
          </div>

          <div className="w-full mt-20 px-8 py-12 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature box for Climate Actions */}
              <Link href="/contribute">
                <div className="mt-20"></div>
                <div className="feature-box">
                  <GlobeAltIcon className="h-8 w-8 text-white" />
                  <p className="text-white">
                    Discover how you can make a difference with the Climate Actions initiative.
                  </p>
                </div>
              </Link>

              {/* Feature box for Project Portfolio */}
              <Link href="/project-overview">
                <div className="mt-20"></div>
                <div className="flex flex-col bg-green-700/90 backdrop-blur-lg px-10 py-10 text-center items-center rounded-3xl shadow-lg cursor-pointer h-64 justify-between">
                  <DocumentMagnifyingGlassIcon className="h-8 w-8 text-white" />
                  <p className="text-white">Check out our existing projects and their mission statements.</p>
                </div>
              </Link>

              {/* Feature box for Start Project */}
              <Link href="/create-project">
                <div className="mt-20"></div>
                <div className="flex flex-col bg-orange-700/90 backdrop-blur-lg px-10 py-10 text-center items-center rounded-3xl shadow-lg cursor-pointer h-64 justify-between">
                  <LightBulbIcon className="h-8 w-8 text-white" />
                  <p className="text-white">Apply to launch your climate change project with us.</p>
                </div>
              </Link>

              {/* Feature box for Community Forum */}
              <Link href="/community">
                <div className="mt-20"></div>
                <div className="flex flex-col bg-indigo-700/90 backdrop-blur-lg px-10 py-10 text-center items-center rounded-3xl shadow-lg cursor-pointer h-64 justify-between">
                  <UsersIcon className="h-8 w-8 text-white" />
                  <p className="text-white">Connect with like-minded individuals on our Community Forum.</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
