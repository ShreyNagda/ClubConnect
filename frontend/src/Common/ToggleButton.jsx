import React, { useState } from "react";

function ToggleButton({
  onToggle,
  value,
  label1 = "Club",
  label2 = "Society",
}) {
  // Initialize the state based on the provided value
  const [isFirstOption, setIsFirstOption] = useState(
    value ? value === label1.toLowerCase() : true
  );

  const toggleSwitch = () => {
    setIsFirstOption(!isFirstOption);
    onToggle(isFirstOption ? label2 : label1); // Call the parent function with the toggled value
  };

  return (
    <div className="flex items-start justify-start w-full space-x-4">
      {/* Label for the first option */}
      <span
        className={`text-lg ${
          isFirstOption ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {label1}
      </span>

      {/* iOS-like Toggle Switch */}
      <div
        className={`w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isFirstOption ? "bg-gray-300" : "bg-gray-300"
        }`}
        onClick={toggleSwitch}
      >
        {/* Toggle Button */}
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            isFirstOption ? "translate-x-0" : "translate-x-8"
          }`}
        />
      </div>

      {/* Label for the second option */}
      <span
        className={`text-lg ${
          !isFirstOption ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {label2}
      </span>
    </div>
  );
}

export default ToggleButton;
