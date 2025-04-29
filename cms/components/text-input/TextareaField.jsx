import { TextArea } from "@/cms/components/ui/text-area";
import { Label } from "@/cms/components/ui/label";

const TextareaField = ({ id, name, value, onChange, placeholder, label, height }) => (
  <>
    <Label htmlFor={id} className="font-bold">
      {label}
    </Label>
    <TextArea
      id={id}
      name={name}
      variant="grey"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      height={height}
    />
  </>
);

export default TextareaField;