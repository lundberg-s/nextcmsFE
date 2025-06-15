import React from "react";
import { Label } from "@/shared/ui/label";
import { InputField } from "../inputfield/InputField";
import { DropdownField } from "../dropdown/DropdownField";
import { SliderField } from "../slider/SliderField";


export const LabeledField: React.FC<LabeledFieldProps> = (props) => {
  const { label, value, type } = props;

  return (
    <div>
      <div className="w-full flex justify-between my-2">
        <Label>{label}</Label>
        {value && type === "slider" ? <Label>{value}</Label> : null}
      </div>

      {type === "input" && <InputField {...props} />}
      {type === "dropdown" && <DropdownField {...props} />}
      {type === "slider" && <SliderField {...props} />}
    </div>
  );
};
