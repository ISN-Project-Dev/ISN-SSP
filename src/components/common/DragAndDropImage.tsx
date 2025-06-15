"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoIcon } from '@heroicons/react/24/solid'

interface DragAndDropImageProps {
  label: string;
  name: string; // Name for the file input to identify the data in the backend
  initialImage?: string | null; // Prop to accept the initial image URL or ID
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({ label, name, initialImage }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);

  // useEffect(() => {
  //   if (previewUrl) {
  //     console.log("Current Preview URL:", previewUrl);
  //   }
  // }, [previewUrl]); // Logs every time previewUrl changes

  useEffect(() => {
    setPreviewUrl(initialImage || null);
  }, [initialImage]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      handleDelete();
    }
  };

  const setFile = (file: File) => {
    // const maxSizeInMB = 10;
    // const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // if (file.size > maxSizeInBytes) {
    //   alert(`File is too large. Maximum allowed size is ${maxSizeInMB}MB.`);
    //   return;
    // }

    setPreviewUrl(URL.createObjectURL(file));
    // Keep the file input in the DOM to ensure FormData works
    //  console.log("Preview URL set:", URL.createObjectURL(file)); // Log the URL of the file
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    const input = document.querySelector(
      `input[name="${name}"]`,
    ) as HTMLInputElement;
    if (input) {
      input.value = ""; // Clear the file input
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="relative flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50"
      >
        {previewUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={previewUrl}
              layout="fill"
              alt="Preview"
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute right-2 top-2 z-10 rounded-full w-8 h-8 flex items-center justify-center bg-red-500 p-2 text-white"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500">
            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
            Upload a file or drag and drop
          </label>
        )}
        {/* Keep the file input hidden but in the DOM */}
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="absolute z-0 h-full w-full opacity-0"
        />
      </div>
    </div>
  );
};

export default DragAndDropImage;
