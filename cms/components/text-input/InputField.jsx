import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const InputField = ({ data, onChange }) => {
  const { id, name, value, placeholder, label } = data;
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