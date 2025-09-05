import React from "react";

interface RulesSectionProps {
  section: {
    bgColor: string;
    borderColor: string;
    color: string;
    icon: React.ReactNode;
    title: string;
    rules: string[];
  };
}

const RulesSection = ({ section }: RulesSectionProps) => {
  return (
    <div
      className={`${section.bgColor} ${section.borderColor} border-2 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center mb-4">
        <div
          className={`text-3xl sm:text-4xl mr-4 p-3 rounded-full bg-gradient-to-r ${section.color} bg-clip-text`}
        >
          {section.icon}
        </div>
        <h2
          className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
        >
          {section.title}
        </h2>
      </div>

      <div className="space-y-3">
        {section.rules.map((rule, ruleIndex) => (
          <div key={ruleIndex} className="flex items-start">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color} mt-2 mr-3 flex-shrink-0`}
            ></div>
            <p className="text-gray-700 leading-relaxed">
              {rule.split("**").map((part, partIndex) =>
                partIndex % 2 === 0 ? (
                  <span key={partIndex}>{part}</span>
                ) : (
                  <strong
                    key={partIndex}
                    className="font-semibold text-gray-900"
                  >
                    {part}
                  </strong>
                )
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesSection;
