import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface DropdownSelectProps {
  data?: {
    options?: Array<{ label?: string; value: string }>;
    variant?: "default" | "primary" | "secondary";
    value?: string | null;
    placeholder?: string;
    disabled?: boolean;
    noOptionsMessage?: string;
    enhancedOption?: "All" | "None" | null;
  };
  onChange: (value: string) => void;
}

export default function DropdownSelect({ data = {}, onChange }: DropdownSelectProps) {
  const {
    options = [],
    variant = "default",
    value = "",
    placeholder,
    disabled = false,
    noOptionsMessage = "No options available",
    enhancedOption = null,
  } = data;

  const enhancedOptions = () => {
    if (enhancedOption === "All") {
      return [{ value: "all", label: "All" }, ...options];
    }
    if (enhancedOption === "None") {
      return [{ value: "", label: "None" }, ...options];
    }
    return options;
  };

  return (
    <Select value={value ?? ""} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {enhancedOptions()?.length > 0 ? (
          enhancedOptions().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem disabled value={"None"}>
            {noOptionsMessage}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}