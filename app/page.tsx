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
    <main className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold">Little horses</h1>
      <p className="my-4 text-center text-gray-700 max-w-xl">
        Welcome to Little Horses! Enjoy a fun and simple board game experience.{" "}
        <br />
        Click &quot;New Game&quot; to start playing and have a great time with
        friends or family.
        <br />
        Use &quot;Game Rules&quot; to learn how to play, and
        &quot;Continue&quot; to resume your last game.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => router.push("/rules")}>Game Rules</Button>
        <Button onClick={handleNewGame}>New Game</Button>
        <Button onClick={() => router.push("/game")}>Continue</Button>
      </div>
    </main>
  );
}
