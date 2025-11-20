import * as React from "react";
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
  onChange?: (value: string) => void;
  className?: string;
};

export function SelectFilter({
  label,
  name,
  options,
  placeholder,
  defaultValue,
  error,
  onChange,
  className,
}: FormType) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Select
        name={name}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectTrigger className={`w-full ${className || ""}`}>
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
