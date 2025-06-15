interface BaseFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface InputFieldProps extends BaseFieldProps {
  type: "input";
  placeholder?: string;
}

interface DropdownFieldProps extends BaseFieldProps {
  type: "dropdown";
  options: { value: string; label: string }[];
  placeholder?: string;
}

interface SliderFieldProps extends BaseFieldProps {
  type: "slider";
  min?: number;
  max?: number;
  step?: number;
}

type LabeledFieldProps = InputFieldProps | DropdownFieldProps | SliderFieldProps;