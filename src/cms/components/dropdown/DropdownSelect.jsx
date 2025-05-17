import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export default function DropdownSelect({ data, onChange }) {
  const {
    options,
    variant = "default",
    value,
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
      return [{ value: null, label: "None" }, ...options];
    }
    return options;
  };

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger variant={variant}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {enhancedOptions()?.length > 0 ? (
          enhancedOptions().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label || option.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem disabled>{noOptionsMessage}</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
