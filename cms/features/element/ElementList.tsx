import { ElementItem } from "./ElementItem";
import { useElement } from "@/cms/lib/hooks/useElement";
import { AddElementForm } from "./AddElementForm";
import { DialogModal } from "@/cms/components/modals/DialogModal";
import { Tabs } from "@/cms/components/tabs/Tabs";
import { UseFormWatch } from "react-hook-form";
import React from "react";

interface ElementListProps {
  content?: Record<string, any>;
  config?: Record<string, string>;

  setValue: (name: string, value: any) => void;
  watch: UseFormWatch<any>;
  reset: (values?: Record<string, any>) => void;

  updateContent?: (type: ElementType, value: any, kind: ElementKind) => void;
  updateConfig?: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent?: (type: ElementType, kind: ElementKind) => void;
  removeConfig?: (type: ElementType, kind: ElementKind) => void;
}

export function ElementList({ setValue, watch, reset }: ElementListProps) {
  const {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig,
  } = useElement(setValue, watch, reset);

  const config = watch("config");
  const content = watch("content");

  const buttons = {
    addContentButton: {
      icon: "plus",
      label: "Add Content",
      variant: "outline",
    },
    addConfigButton: {
      icon: "plus",
      label: "Add Config",
      variant: "outline",
    },
  };

  const addElementModals = [
    {
      title: "Add Content",
      description:
        "Select a component to add to your block. You can customize its properties after adding.",
      content: AddElementForm,
      formFn: addContent,
      kind: "content",
      button: buttons.addContentButton,
    },
    {
      title: "Add Config",
      description: "Select a Config to customize the appearance of your block.",
      content: AddElementForm,
      formFn: addConfig,
      kind: "config",
      button: buttons.addConfigButton,
    },
  ];

  const sections = [
    {
      id: "content",
      title: "Content",
      kind: "content" as ElementKind,
      data: content || {},
      onChange: updateContent,
      onRemove: removeContent,
      getProps: (value: any) => ({ component: value as Element }),
    },
    {
      id: "config",
      title: "Config",
      kind: "config" as ElementKind,
      data: config || {},
      onChange: updateConfig,
      onRemove: removeConfig,
      getProps: (value: any) => ({ value }),
    },
  ];

  return (
    <div className="p-2 space-y-4">

      <div className="flex flex-col gap-3">
        {addElementModals.map((form) => (
          <React.Fragment key={form.kind}>
            <DialogModal
              title={form.title}
              description={form.description}
              content={form.content}
              button={form.button}
              props={{ kind: form.kind, formFn: form.formFn }}
            />
          </React.Fragment>
        ))}
      </div>

      <Tabs
        tabs={sections.map(({ id, title }) => ({ id, title }))}
        defaultTabId="content"
        renderContent={(tabId) => {
          const section = sections.find((section) => section.id === tabId);
          if (!section) return null;

          return (
            <>
              {Object.entries(section.data).map(([type, value]) => (
                <ElementItem
                  mode="edit"
                  key={`${section.kind}-${type}`}
                  type={type as ElementType}
                  kind={section.kind}
                  onChange={section.onChange}
                  onRemove={section.onRemove}
                  {...section.getProps(value)}
                />
              ))}
            </>
          );
        }}
      />
    </div>
  );
}