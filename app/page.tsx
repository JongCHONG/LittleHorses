"use client";

import { useRouter } from "next/navigation";
import Button from "components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold">Little horses</h1>
      <p className="my-4 text-center text-gray-700 max-w-xl">
        Welcome to Little Horses! Enjoy a fun and simple board game experience.{" "}
        <br />
        Click "New Game" to start playing and have a great time with friends or
        family.
        <br />
        Use "Game Rules" to learn how to play, and "Continue" to resume your last game.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => router.push("/rules")}>Game Rules</Button>
        <Button onClick={() => router.push("/game")}>New Game</Button>
        <Button onClick={() => router.push("/game")}>Continue</Button>
      </div>
    </main>
  );
}
