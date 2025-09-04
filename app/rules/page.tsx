"use client";

const Rules = () => {
  return (
    <div className="max-w-lg rounded-lg shadow-md p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Game Rules
      </h2>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">
          Bringing Pieces into Play
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            To move a piece out of the stable and onto the first square of the track, you must roll a <strong>6</strong> on the dice.
          </li>
          <li>
            If you roll a 6, you can bring out a piece <strong>and</strong> roll the dice again.
          </li>
          <li>
            As long as the player keeps rolling 6s, they may continue to play.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-green-700">
          Regular Movement
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            On each turn, the player rolls the dice and moves one of their pieces forward by the number shown.
          </li>
          <li>
            Pieces move along the path marked by their color: each player has their own starting square and follows the common outer track (clockwise or counterclockwise depending on local rules).
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-red-700">
          Capturing an Opponent&#39;s Piece
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            If a piece lands on the same square as another (except for the finish or stable squares), the piece already there is &quot;captured&quot; and sent back to its original stable: it must roll a 6 again to come out.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-yellow-700">
          Final Stretch
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            When a piece has completed a full lap, it turns onto its &#39;final stretch&#39; (the colored path leading to the center). There, it advances one square at a time according to dice rolls.
          </li>
          <li>
            To reach the last finish square, you must roll exactly the number of spaces remaining: if you roll too high, the piece does not move.
          </li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-2 text-purple-700">
          Winning the Game
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The winner is the first to bring all their pieces to the central finish square of their color.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Rules;
