import * as React from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type FormType = {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  defaultValue?: any;
  error?: string;
};

export function SelectField({
  label,
  name,
  options,
  placeholder,
  defaultValue,
  error,
}: FormType) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Select
        name={name}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder || label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <span className="text-sm font-medium text-red-700">{error}</span>}
    </div>
  );
}
