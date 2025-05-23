import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface InputFieldProps {
  data: {
    id: string;
    name: string;
    value?: string;
    placeholder?: string;
    label: string;
    required?: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ data, onChange }: InputFieldProps) => {
  const { id, name, value, placeholder, label } = data;
  return (
    <>
      <Label htmlFor={id} className="font-bold">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;