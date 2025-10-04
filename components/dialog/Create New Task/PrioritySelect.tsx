"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const priorities = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

const PrioritySelect = ({ value, onChange }: PrioritySelectProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        {priorities.map((priority) => (
          <SelectItem key={priority.value} value={priority.value}>
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PrioritySelect;
