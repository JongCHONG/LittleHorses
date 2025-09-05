"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import Button from "../../components/Button";
import RulesSection from "components/RulesSection";
import { rulesSections } from "utils/constants/rulesSectionsData";

const Rules = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen-safe bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                📚 Game Rules 📚
              </h1>
              <div className="h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-2"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master the art of Little Horses with these comprehensive rules and
              strategies
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 mb-12">
            {rulesSections.map((section) => (
              <RulesSection key={uuidv4()} section={section} />
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 flex items-center">
              💡 Pro Tips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-lg mr-2">🎯</span>
                <span className="text-amber-700">
                  Focus on getting all pieces out before advancing too far
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2">🛡️</span>
                <span className="text-amber-700">
                  Use blocking strategies to slow opponents
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2">🎲</span>
                <span className="text-amber-700">
                  Count spaces carefully in the final stretch
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2">⚡</span>
                <span className="text-amber-700">
                  Keep rolling those 6s for extra turns!
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
              <Button
                onClick={() => router.push("/")}
                className="w-full sm:w-auto min-w-[140px] bg-gray-500 hover:bg-gray-600 text-white"
              >
                🏠 Home
              </Button>

              <Button
                onClick={() => router.push("/game")}
                className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                🎮 Start Playing
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Ready to put these rules into practice? Start a new game and have
              fun! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
