"use client";

import { Tabs } from "@/cms/components/tabs/Tabs";
import { usePage } from "@/cms/lib/hooks/usePage";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { BlockList } from "../block/BlockList";
import { AddBlockForm } from "@/cms/features/block/AddBlockForm";
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddPageForm } from "./AddPageForm";
import { EditPageForm } from "./EditPageForm";
import { DialogModal } from "@/cms/components/modals/DialogModal";
import LoadingSpinner from "@/shared/components/loading/LoadingSpinner";

export function PageList({}) {
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
      showDelete: true,
      button: {
        icon: "settings",
        variant: "defaultRight",
        disabled: !selectedPage,
      },
    },
  ];

  return (
    <>
      {isLoadingPages ? (
        <LoadingSpinner />
      ) : (
        <ScrollArea className="w-full h-full p-4">
          <Tabs
            tabs={pages.map((page) => ({
              id: page.id,
              title: page.title,
            }))}
            defaultTabId={initialPage?.id}
            onTabChange={(tabId) => {
              const page = pages.find((page) => page.id === tabId);
              if (page) {
                setSelectedPage(page);
              }
            }}
            renderSettings={
              <div className="w-full flex justify-between">
                <div className="flex pl-2 gap-2 items-center">
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
                      showDelete={setting.showDelete}
                    />
                  ))}
                </div>
              </div>
            }
            renderContent={(tabId) => {
              const page = pages.find((page) => page.id === tabId);
              if (!page) return null;
              return <BlockList />;
            }}
          />
        </ScrollArea>
      )}
    </>
  );
}
