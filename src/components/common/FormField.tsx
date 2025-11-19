import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormType = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  error?: string;
};

const FormField = ({
  label,
  type,
  name,
  placeholder,
  defaultValue,
  error,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>
        {label}
      </Label>
      <Input
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
      className={`${type === "date" ? "w-full min-w-0" : ""}`}

      />
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
};

export default FormField;
