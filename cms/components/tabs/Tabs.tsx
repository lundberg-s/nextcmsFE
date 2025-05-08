import {
  Tabs as RadixTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/cms/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

interface TabsProps {
  tabs: { id: string; title: string }[]; // Array of tab data
  defaultTabId?: string; // Default selected tab
  onTabChange?: (tabId: string) => void; // Callback when tab changes
  renderContent: (tabId: string) => React.ReactNode; // Function to render tab content
}

export function Tabs({
  tabs,
  defaultTabId,
  onTabChange,
  renderContent,
}: TabsProps) {
  return (
    <RadixTabs
      defaultValue={defaultTabId}
      onValueChange={(value) => onTabChange?.(value)}
      className="h-full"
    >
      <div className="flex justify-between items-center pb-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="px-5">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
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
