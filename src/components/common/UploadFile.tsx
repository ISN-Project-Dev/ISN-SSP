"use client";

import React from "react";

interface UploadFileProps {
  label: string;
  name: string;
  limitSize: number; // Limit size in MB
  error?: string;
}

const UploadFile: React.FC<UploadFileProps> = ({
  label,
  name,
  limitSize,
  error,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024; // Convert size from bytes to MB
      if (fileSizeInMB > limitSize) {
        alert(`File ${file.name} exceeds the size limit of ${limitSize} MB.`);
        event.target.value = ""; // Reset the file input if the file is too large
      }
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        id={name}
        name={name}
        className="block w-full text-sm border border-gray-200 rounded-lg file:cursor-pointer file:mr-5 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:h-9 file:text-sm file:font-medium hover:file:bg-gray-200"
      />
      {/* <p className="text-sm text-gray-600">
        For multiple files, please compress them ito zip file.
      </p> */}
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
};

export default UploadFile;
