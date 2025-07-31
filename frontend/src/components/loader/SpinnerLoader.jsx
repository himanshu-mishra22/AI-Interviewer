import React from 'react';
const SpinnerLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div 
        className="w-8 h-8 border-8 border-dashed rounded-full animate-spin border-blue-600"
      ></div>
    </div>
  );
};
export default SpinnerLoader;
