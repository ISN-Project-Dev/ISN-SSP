"use client";

import React, { useEffect, useRef, useState } from "react";

interface UploadFileProps {
  label: string;
  name: string;
  limitSize: number;
  initialFileName?: string | null;
  error?: string;
  file: File | null;
  setFile: (file: File | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  label,
  name,
  limitSize,
  initialFileName = null,
  error,
  file,
  setFile,
}) => {
  const [fileName, setFileName] = useState<string>(initialFileName ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(initialFileName ?? "");
    }
  }, [file, initialFileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileSizeInMB = selectedFile.size / 1024 / 1024;
    if (fileSizeInMB > limitSize) {
      alert(`File "${selectedFile.name}" exceeds the size limit of ${limitSize} MB.`);
      event.target.value = ""; // Clear input
      return;
    }

    setFile(selectedFile);
  };

  const handleDelete = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          id={name}
          name={name}
          ref={fileInputRef}
          accept="*"
          onChange={handleFileChange}
          className="block w-full text-sm border border-gray-200 rounded-lg file:cursor-pointer file:mr-5 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:h-9 file:text-sm file:font-medium hover:file:bg-gray-200"
        />
        {fileName && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-600 underline hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>
      {fileName && (
        <p className="text-sm text-gray-500 truncate pl-2">Current file: {fileName}</p>
      )}
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
};

export default UploadFile;
