import { useForm } from "react-hook-form";
import { ElementKind } from "@/cms/lib/types/blocks";
import { Button } from "@/cms/components/ui/button";

type ConfigType = "backgroundColor" | "backgroundImage" | "textColor";

interface FormValues {
  configType: ConfigType;
}

interface AddConfigFormProps {
  onSubmitCallback: (type: ConfigType, kind: ElementKind) => void;
  onCancelCallback: () => void;
}

const configList: {
  type: ConfigType;
  label: string;
  description: string;
  kind: ElementKind;
}[] = [
  {
    type: "backgroundColor",
    label: "Background Color",
    description: "Set the background color using hex or color name",
    kind: "config",
  },
  {
    type: "backgroundImage",
    label: "Background Image",
    description: "Add an image URL for the background",
    kind: "config",
  },
  {
    type: "textColor",
    label: "Text Color",
    description: "Set the color for text elements",
    kind: "config",
  },
];

export function AddConfigForm({ onSubmitCallback, onCancelCallback }: AddConfigFormProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      configType: "backgroundColor",
    },
  });

  const selectedType = watch("configType");

  const onFormSubmit = handleSubmit((data) => {
    const configItem = configList.find(c => c.type === data.configType);
    if (configItem) {
      onSubmitCallback(configItem.type, configItem.kind);
    }
  });

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      <div className="space-y-4">
        {configList.map((config) => (
          <label 
            key={config.type}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedType === config.type ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"
            }`}
          >
            <input
              type="radio"
              className="mt-1 mr-3"
              value={config.type}
              {...register("configType")}
            />
            <div className="flex-1">
              <div className="font-medium">{config.label}</div>
              <div className="text-sm text-muted-foreground">{config.description}</div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancelCallback}>
          Cancel
        </Button>
        <Button onClick={(e) => {
          e.preventDefault();
          onFormSubmit(e);
        }} type="submit">
          Add Config
        </Button>
      </div>
    </form>
  );
}