import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = (data) => {
  const { id, name, value, onChange, placeholder, label } = data;
  return (
    <>
      <Label htmlFor={id} className="font-bold">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        variant="grey"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;