"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
  { value: "UNASSIGNED", label: "Unassigned" },
];

const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
