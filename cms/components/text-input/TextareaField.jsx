import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

const TextareaField = ({ id, name, value, onChange, placeholder, label }) => (
  <>
    <Label htmlFor={id}>
      {label}
    </Label>
    <Textarea
      id={id}
      name={name}
      variant="grey"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      
    />
  </>
);

export default TextareaField;