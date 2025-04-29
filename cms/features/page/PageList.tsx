"use client";

import { Tabs, TabsContent } from "@/cms/components/ui/tabs";
import { usePage } from "@/cms/lib/hooks/usePage";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { BlockList } from "../block/BlockList";
import { AddBlockForm } from "@/cms/features/block/AddBlockForm";
import { PageTabs } from "./PageTabs";
import { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddPageForm } from "./AddPageForm";
import { EditPageForm } from "./EditPageForm";
import { DialogModal } from "@/cms/components/modals/DialogModal";

export function PageList({ }) {
  const { pages, isLoadingPages } = usePage();
  const { selectedPage, setSelectedPage } = useCmsContext();

  const initialPage = pages.find((page) => page.slug === "home");

  useEffect(() => {
    if (initialPage) {
      setSelectedPage(initialPage);
    }
  }, [initialPage, setSelectedPage]);

  const settingsList = [
    {
      title: "Add Page",
      description: "Create a new page",
      icon: "plus",
      form: AddPageForm,
      button: {
        icon: "plus",
        variant: "ghost",
      },
    },
    {
      title: "Add Block",
      description: "Add a block to the selected page",
      icon: "plus",
      form: AddBlockForm,
      button: {
        label: "Add Block",
        icon: "plus",
        variant: "defaultLeft",
        disabled: !selectedPage,
      },
    },
    {
      title: "Edit Page",
      description: "Edit the selected page",
      icon: "edit",
      form: EditPageForm,
      button: {
        icon: "settings",
        variant: "defaultRight",
        disabled: !selectedPage,
      },
    },
  ];

  if (isLoadingPages) {
    return null;
  }

  return (
    <div className="mx-auto p-4">
      <ScrollArea className="w-full h-full">
        <Tabs
          defaultValue={initialPage?.id}
          onValueChange={(value) =>
            setSelectedPage(pages.find((page) => page.id === value) || null)
          }
        >
          <div className="flex justify-between items-center pb-4">
            <div className="flex gap-2 items-center">
              <PageTabs />
                {settingsList.slice(0, 1).map((setting) => (
                  <DialogModal
                    key={setting.title}
                    title={setting.title}
                    description={setting.description}
                    content={setting.form}
                    button={setting.button}
                  />
                ))}
            </div>
            <div className="flex items-center gap-0.5">
              {settingsList.slice(1).map((setting) => (
                <DialogModal
                  key={setting.title}
                  title={setting.title}
                  description={setting.description}
                  content={setting.form}
                  button={setting.button}
                  showDelete
                />
              ))}
            </div>
          </div>

          {pages.map((page) => (
            <TabsContent key={page.id} value={page.id}>
              <BlockList />
            </TabsContent>
          ))}
        </Tabs>
      </ScrollArea>
    </div>
  );
}
