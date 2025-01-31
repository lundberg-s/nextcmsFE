// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { nanoid } from "nanoid";
import { mockBlocks } from "@/lib/mock-data";
import { AdminActions } from "./components/AdminActions";
import { BlockList } from "./components/BlockList";
import { AddBlockModal } from "./components/AddBlockModal";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { EditBlockModal } from "./components/EditBlockModal";
import { PageList } from "./components/PageList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export default function AdminPage() {
  const {
    addBlock,
    removeBlock,
    selectedBlock,
    setSelectedBlock,
    pages,
    selectedPage,
    setSelectedPage,
  } = useAdminStore();

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [deleteBlockId, setDeleteBlockId] = useState<string | null>(null);

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages.find((page) => page.slug === "/") || null);
    }
  }, [pages, selectedPage, setSelectedPage]);

  const handleAddBlock = () => {
    if (selectedType && selectedPage) {
      const newBlock = {
        id: nanoid(),
        type: selectedType,
        content: {
          title: "Testdata",
          description: "",
          cta: {
            text: "",
            link: "",
          },
          items: [],
        },
        settings: {},
        pageId: selectedPage.id,
      };
      console.log('calling addBlock');
      addBlock(newBlock);
      setSelectedPage({
        ...selectedPage,
        blocks: [...selectedPage.blocks, newBlock.id],
      });
      setOpen(false);
      setSelectedType(null);
    }
  };

  const handleDeleteBlock = (id: string) => {
    setDeleteBlockId(id);
  };

  const confirmDeleteBlock = () => {
    if (deleteBlockId) {
      removeBlock(deleteBlockId);
      if (selectedPage) {
        setSelectedPage({
          ...selectedPage,
          blocks: selectedPage.blocks.filter(
            (blockId) => blockId !== deleteBlockId
          ),
        });
      }
      setDeleteBlockId(null);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200 w-full">
      <div className="container mx-auto px-4 py-8">
        {/* <PageList pages={pages} /> */}
        <Tabs
          defaultValue={selectedPage?.id || pages[0]?.id}
          onValueChange={(value) =>
            setSelectedPage(pages.find((page) => page.id === value) || null)
          }
        >
          {/* <PageList pages={pages} /> */}
          <div className="flex justify-between items-center">
            <TabsList>
              {pages.map((page) => (
                <TabsTrigger
                  key={page.id}
                  value={page.id}
                  onClick={() => setSelectedPage(page)}
                >
                  {page.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <AdminActions pages={pages} onAddBlockClick={() => setOpen(true)} />
          </div>
          {pages.map((page) => (
            <TabsContent key={page.id} value={page.id}>
              <BlockList
                blocks={page.blocks}
                onEditBlock={setSelectedBlock}
                onDeleteBlock={handleDeleteBlock}
                confirmDeleteBlock={confirmDeleteBlock}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <AddBlockModal
        open={open}
        onOpenChange={setOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onAddBlock={handleAddBlock}
      />
      <EditBlockModal block={selectedBlock} />
      {deleteBlockId && (
        <DeleteConfirmationModal
          deleteBlockId={deleteBlockId}
          onConfirmDelete={confirmDeleteBlock}
          onCancelDelete={() => setDeleteBlockId(null)}
        />
      )}
    </div>
  );
}
