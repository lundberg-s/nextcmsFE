import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface PasswordFieldProps {
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

const PasswordField = ({ data, onChange }: PasswordFieldProps) => {
  const { id, name, value, placeholder, label } = data;
  return (
    <>
      <Label htmlFor={id} className="font-bold">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default PasswordField;