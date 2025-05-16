import {
  Tabs as RadixTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

interface TabsProps {
  tabs: { id: string; title: string }[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  renderSettings?: React.ReactNode
  renderContent: (tabId: string) => React.ReactNode;
}

export function Tabs({
  tabs,
  defaultTabId,
  onTabChange,
  renderSettings,
  renderContent,
}: TabsProps) {
  return (
    <RadixTabs
      defaultValue={defaultTabId}
      onValueChange={(value) => onTabChange?.(value)}
      className="h-full"
    >
      <div className="flex items-center pb-4 w-full">
        <TabsList className={`${renderSettings ? "" : "w-full"}`}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="px-5">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {renderSettings && renderSettings}
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <ScrollArea className="w-full min-h-screen max-h-screen space-y-2">
            {renderContent(tab.id)}
          </ScrollArea>
        </TabsContent>
      ))}
    </RadixTabs>
  );
}
