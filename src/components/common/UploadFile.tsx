import React from "react";

type FormType = {
  defaultValue?: any;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
  accept?: string;
  helper?: string;
};

const UploadFile = ({
  label,
  defaultValue,
  type,
  name,
  placeholder,
  error,
  accept,
  helper,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="block w-full text-sm border border-gray-200 rounded-lg file:cursor-pointer file:mr-5 file:border-0 file:bg-gray-200 file:px-3 file:py-1 file:h-9 file:text-sm file:font-medium hover:file:bg-gray-200"
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
        accept={accept}
      />
      <p
        className="text-sm pl-2 text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        {helper}
      </p>
      {error && <span className="text-red-700">{error}</span>}
    </div>
  );
};

export default UploadFile;
