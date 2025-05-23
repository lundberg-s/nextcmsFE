import React from "react";
import { ElementItem } from "./ElementItem";
import { useElement } from "@/cms/lib/hooks/useElement";
import { AddElementForm } from "./AddElementForm";
import { DialogModal } from "@/cms/components/modals/DialogModal";
import { Tabs } from "@/cms/components/tabs/Tabs";
import { UseFormWatch } from "react-hook-form";

interface ElementListProps {
  setValue: (name: string, value: any) => void;
  watch: UseFormWatch<any>;
  reset: (values?: Record<string, any>) => void;
}

interface SectionBase<T> {
  id: string;
  title: string;
  description?: string;
  kind: ElementKind;
  value?: T;
  onChange: (type: ElementType, value: T, kind: ElementKind) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
}

export function ElementList({ setValue, watch, reset }: ElementListProps) {
  const {
    addContent,
    addstyle,
    updateContent,
    updatestyle,
    removeContent,
    removestyle,
  } = useElement(setValue, watch, reset);

  const style = (watch("style") as string);
  const content = (watch("content") as Record<string, ContentElement>) || {};

  const buttons = {
    addContentButton: {
      icon: "plus",
      label: "Add Content",
      variant: "outline",
    },
    addstyleButton: {
      icon: "plus",
      label: "Add Style",
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
      kind: "content" as const,
      button: buttons.addContentButton,
    },
    {
      title: "Add Style",
      description: "Select a style to customize the appearance of your block.",
      content: AddElementForm,
      formFn: addstyle,
      kind: "style" as const,
      button: buttons.addstyleButton,
    },
  ];
  const contentSection: SectionBase<Record<string, ContentElement>> = {
    id: "content",
    title: "Content",
    kind: "content",
    value: content || {},
    onChange: updateContent,
    onRemove: removeContent,
  };

  const styleSection: SectionBase<string> = {
    id: "style",
    title: "Style",
    kind: "style",
    value: style,
    onChange: updatestyle,
    onRemove: removestyle,
  };

  const sections = [contentSection, styleSection];
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
            {section.kind === "content"
              ? Object.entries(section.value || {}).map(([key, value]) => (
                  <ElementItem
                    key={key}
                    mode="edit"
                    label={section.title}
                    type={key as ContentType}
                    kind="content"
                    value={value}
                    onChange={section.onChange}
                    onRemove={section.onRemove}
                  />
                ))
              : Object.entries(section.value || {}).map(([key, value]) => (
                  <ElementItem
                    key={key}
                    mode="edit"
                    type={key as StyleType}
                    kind="style"
                    value={value}
                    onChange={section.onChange}
                    onRemove={section.onRemove}
                  />
                ))}
            </>
          );
        }}
      />
    </div>
  );
}
