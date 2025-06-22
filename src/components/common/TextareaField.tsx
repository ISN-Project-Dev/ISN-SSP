import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormType = {
  label: string;
  name: string;
  rows: number | undefined;
  placeholder?: string;
  defaultValue?: any;
  error?: string;
};

const TextareaField = ({
  label,
  name,
  rows,
  placeholder,
  defaultValue,
  error,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>
        {label}
      </Label>
      <Textarea
        defaultValue={defaultValue}
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder || label}
      />
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
};

export default TextareaField;
