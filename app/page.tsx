"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Button from "components/Button";
import { persistor } from "utils/store";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNewGame = async () => {
    dispatch({ type: "RESET_GAME" });
    persistor.purge();
    router.push("/game");
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-amber-50 via-white to-indigo-50 flex justify-center items-center">
      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">

          <div className="mb-8 sm:mb-12">
            <div className="inline-block mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                🐎 Little Horses 🐎
              </h1>
              <div className="h-1 bg-gradient-to-r from-amber-400 to-red-400 rounded-full mt-2"></div>
            </div>
            
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Welcome to <span className="font-semibold text-amber-700">Little Horses</span>! 
              <br /> 
              Enjoy a fun and simple board game experience perfect for friends and family.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-semibold text-gray-800 mb-2">Learn to Play</h3>
                <p className="text-sm text-gray-600">Master the rules and become a Little Horses champion</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">🎮</div>
                <h3 className="font-semibold text-gray-800 mb-2">Start Fresh</h3>
                <p className="text-sm text-gray-600">Begin a brand new adventure with up to 4 players</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">⏯️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Continue Game</h3>
                <p className="text-sm text-gray-600">Resume your last saved game and keep playing</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4 lg:space-x-6">
            <Button 
              onClick={() => router.push("/rules")}
              className="w-full sm:w-auto min-w-[140px] bg-blue-500 hover:bg-blue-600 text-white"
            >
              📖 Game Rules
            </Button>
            
            <Button 
              onClick={handleNewGame}
              className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
            >
              🎮 New Game
            </Button>
            
            <Button 
              onClick={() => router.push("/game")}
              className="w-full sm:w-auto min-w-[140px] bg-amber-500 hover:bg-amber-600 text-white"
            >
              ⏯️ Continue
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm text-gray-500 mb-4">
              A classic board game reimagined for the digital age
            </p>
            <div className="flex justify-center space-x-8 text-xs text-gray-400">
              <span>👥 1-4 Players</span>
              <span>⏱️ 15-30 min</span>
              <span>🎯 Family Friendly</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
