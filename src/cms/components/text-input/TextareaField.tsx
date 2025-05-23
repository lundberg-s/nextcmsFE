import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

interface TextareaFieldProps {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextareaField = ({ id, name, value, placeholder, label, onChange }: TextareaFieldProps) => {
  return (
    <>
      <Label htmlFor={id}>
        {label}
      </Label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextareaField;