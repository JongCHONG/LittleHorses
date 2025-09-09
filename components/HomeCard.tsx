import React from "react";

interface HomeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default HomeCard;
