"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface DragAndDropImageProps {
  label: string;
  name: string;
  initialImage?: string | null;
  file: File | null;
  setFile: (file: File | null) => void;
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({
  label,
  name,
  initialImage,
  file,
  setFile,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage || null
  );

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsDeleted(false);
      return () => URL.revokeObjectURL(url);
    }

    if (!file && !isDeleted) {
      setPreviewUrl(initialImage || null);
    }

    if (isDeleted) {
      setPreviewUrl(null);
    }
  }, [file, initialImage, isDeleted]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setIsDeleted(true);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
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
              fill
              sizes="100%"
              alt="Preview"
              className="rounded-lg object-cover"
              priority
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
            <PhotoIcon className="mx-auto size-12 text-gray-300" />
            Upload a file or drag and drop
          </label>
        )}
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
