import { useForm } from "react-hook-form";
import { ComponentKind } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";

type SettingType = "backgroundColor" | "backgroundImage" | "textColor";

interface FormValues {
  settingType: SettingType;
}

interface AddSettingFormProps {
  onSubmit: (type: SettingType, kind: ComponentKind) => void;
  onCancel: () => void;
}

const settings: {
  type: SettingType;
  label: string;
  description: string;
  kind: ComponentKind;
}[] = [
  {
    type: "backgroundColor",
    label: "Background Color",
    description: "Set the background color using hex or color name",
    kind: "setting",
  },
  {
    type: "backgroundImage",
    label: "Background Image",
    description: "Add an image URL for the background",
    kind: "setting",
  },
  {
    type: "textColor",
    label: "Text Color",
    description: "Set the color for text elements",
    kind: "setting",
  },
];

export function AddSettingForm({ onSubmit, onCancel }: AddSettingFormProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      settingType: "backgroundColor",
    },
  });

  const selectedType = watch("settingType");

  const onFormSubmit = handleSubmit((data) => {
    const setting = settings.find(s => s.type === data.settingType);
    if (setting) {
      onSubmit(setting.type, setting.kind);
    }
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      <div className="space-y-4">
        {settings.map((setting) => (
          <label 
            key={setting.type}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedType === setting.type ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              className="mt-1 mr-3"
              value={setting.type}
              {...register("settingType")}
            />
            <div className="flex-1">
              <div className="font-medium">{setting.label}</div>
              <div className="text-sm text-gray-500">{setting.description}</div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Setting
        </Button>
      </div>
    </form>
  );
}