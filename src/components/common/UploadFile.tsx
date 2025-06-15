"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

interface UploadFileProps {
  label: string;
  name: string;
  limitSize: number;
  initialFileName?: string | null;  
  error?: string;
}

const UploadFile: React.FC<UploadFileProps> = ({
  label,
  name,
  limitSize,
  initialFileName = null,
  error,
}) => {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  // initialize from the prop
  useEffect(() => {
    setFileName(initialFileName || "");
  }, [initialFileName]);

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

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        accept="*"
        onChange={handleFileChange}
        className="block w-full text-sm border border-gray-200 rounded-lg file:cursor-pointer file:mr-5 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:h-9 file:text-sm file:font-medium hover:file:bg-gray-200"
      />
      {fileName && (
        <p className="text-sm text-gray-600 truncate pl-2"> Current Filename: {fileName}</p>
      )}
      {/* {fileName && (
        <p className="text-sm text-gray-600">Current file: {fileName}</p>
      )} */}
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
};

export default UploadFile;
