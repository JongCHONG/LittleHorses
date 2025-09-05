export const rulesSections = [
  {
    title: "Bringing Pieces into Play",
    icon: "🎯",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    rules: [
      "To move a piece out of the stable and onto the first square of the track, you must roll a **6** on the dice.",
      "If you roll a 6, you can bring out a piece **and** roll the dice again.",
      "As long as the player keeps rolling 6s, they may continue to play.",
    ],
  },
  {
    title: "Regular Movement",
    icon: "🎲",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    rules: [
      "On each turn, the player rolls the dice and moves one of their pieces forward by the number shown.",
      "Pieces move along the path marked by their color: each player has their own starting square and follows the common outer track.",
    ],
  },
  {
    title: "Capturing an Opponent's Piece",
    icon: "⚔️",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    rules: [
      "If a piece lands on the same square as another (except for the finish or stable squares), the piece already there is **captured**.",
      "Captured pieces are sent back to their original stable and must roll a 6 again to come out.",
    ],
  },
  {
    title: "Final Stretch",
    icon: "🏁",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    rules: [
      "When a piece has completed a full lap, it turns onto its **final stretch** (the colored path leading to the center).",
      "There, it advances one square at a time according to dice rolls.",
      "To reach the last finish square, you must roll exactly the number of spaces remaining: if you roll too high, the piece does not move.",
    ],
  },
  {
    title: "Winning the Game",
    icon: "🏆",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    rules: [
      "The winner is the first to bring **all their pieces** to the central finish square of their color.",
      "Victory requires strategy, luck, and careful planning of your moves!",
    ],
  },
];
