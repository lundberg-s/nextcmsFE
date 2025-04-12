"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { usePage } from "@/lib/hooks/usePage";
import { useCmsContext } from "@/lib/context/CmsContext";
import { BlockList } from "../block/BlockList";
import { AddBlockForm } from "@/lib/entities/block/AddBlockForm";
import { PageTabs } from "./PageTabs";
import { PageSettings } from "@/components/wrappers/PageSettings";
import { CMSPageHeader } from "@/components/wrappers/CMSPageHeader";
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddPageForm } from "./AddPageForm";
import { EditPageForm } from "./EditPageForm";
import { DialogModal } from "@/components/modals/DialogModal";

export function PageList({}) {
  const { pages } = usePage();
  const { selectedPage, setSelectedPage } = useCmsContext();

  const initialPage = pages.find((page) => page.slug === "home");

  const pageSettings = [
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

  return (
    <div className="w-[90%] mx-auto px-4 py-4">
      <ScrollArea className="w-full h-full">
        <Tabs
          defaultValue={initialPage}
          onValueChange={(value) =>
            setSelectedPage(pages.find((page) => page.id === value) || null)
          }
        >
          <CMSPageHeader>
            <div className="flex gap-2 items-center">
              <PageTabs />
              <PageSettings>
                {pageSettings.slice(0, 1).map((setting) => (
                  <DialogModal
                    key={setting.title}
                    title={setting.title}
                    description={setting.description}
                    content={setting.form}
                    button={setting.button}
                  />
                ))}
              </PageSettings>
            </div>
            <PageSettings>
              {pageSettings.slice(1).map((setting) => (
                <DialogModal
                  key={setting.title}
                  title={setting.title}
                  description={setting.description}
                  content={setting.form}
                  button={setting.button}
                />
              ))}
            </PageSettings>
          </CMSPageHeader>

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
