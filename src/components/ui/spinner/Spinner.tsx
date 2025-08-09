import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent dark:border-gray-300"></div>
    </div>
  );
};

export default Spinner;
