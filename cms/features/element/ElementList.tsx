import { ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { DialogModal } from "@/cms/components/modals/DialogModal";
import { AddContentForm } from "@/cms/features/element/AddContentForm";
import { AddConfigForm } from "@/cms/features/element/AddConfigForm";
import { useCmsContext } from "@/cms/lib/context/CmsContext";

interface ElementListProps {
  addContent: (type: ElementType, kind: ElementKind) => void;
  addConfig: (type: ElementType, kind: ElementKind) => void;
}

export function ElementList({ addContent, addConfig }: ElementListProps) {
  const { selectedBlock } = useCmsContext();

  const formsList = [
    {
      title: "Add Component",
      description:
        "Select a component to add to your block. You can customize its properties after adding.",
      icon: "plus",
      content: AddContentForm,
      onSubmit: addContent,
      button: {
        label: "Add Component",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
    {
      title: "Add Setting",
      description:
        "Select a setting to customize the appearance of your block.",
      icon: "plus",
      content: AddConfigForm,
      onSubmit: addConfig,
      button: {
        label: "Add Setting",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
  ];

  return (
    <>
      {formsList.map((form) => (
        <DialogModal
          key={form.title}
          title={form.title}
          description={form.description}
          content={form.content}
          button={form.button}
          props={{
            onSubmitCallback: (type: ElementType, kind: ElementKind) => {
              form.onSubmit(type, kind);
            },
          }}
        />
      ))}
    </>
  );
}
