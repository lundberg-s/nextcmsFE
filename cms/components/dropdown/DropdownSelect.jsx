import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/cms/components/ui/select";

export default function DropdownSelect({
  options,
  variant = "default",
  value,
  onChange,
  placeholder,
  disabled = false,
  noOptionsMessage = "No options available",
  enhancedOption = null,
}) {
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