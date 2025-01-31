"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useAdminStore } from "@/lib/store/admin-store";
import { AddBlockModal } from "@/components/modals/AddBlockModal";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { PageTabs } from "./PageTabs";
import { PageContent } from "./PageContent";

export function PageManager() {
  const { addBlock, removeBlock, selectedBlock, setSelectedBlock, pages, selectedPage, setSelectedPage } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [deleteBlockId, setDeleteBlockId] = useState<string | null>(null);

  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages.find((page) => page.slug === "home") || null);
    }
  }, [pages, selectedPage, setSelectedPage]);

  const handleAddBlock = () => {
    if (selectedType && selectedPage) {
      const newBlock = {
        id: nanoid(),
        type: selectedType,
        content: { title: "Testdata", description: "", cta: { text: "", link: "" }, items: [] },
        settings: {},
        pageId: selectedPage.id,
      };
      addBlock(newBlock);
      setOpen(false);
      setSelectedType(null);
    }
  };

  const handleDeleteBlock = (id: string) => setDeleteBlockId(id);
  const confirmDeleteBlock = () => {
    if (deleteBlockId) {
      removeBlock(deleteBlockId);
      if (selectedPage) {
        setSelectedPage({ ...selectedPage, blocks: selectedPage.blocks.filter((blockId) => blockId !== deleteBlockId) });
      }
      setDeleteBlockId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 w-full">
      <div className="container mx-auto px-4 py-8">
        <PageTabs pages={pages} selectedPage={selectedPage} setSelectedPage={setSelectedPage} setOpen={setOpen} />
        <PageContent pages={pages} setSelectedBlock={setSelectedBlock} handleDeleteBlock={handleDeleteBlock} confirmDeleteBlock={confirmDeleteBlock} />
      </div>
      <AddBlockModal open={open} onOpenChange={setOpen} selectedType={selectedType} setSelectedType={setSelectedType} onAddBlock={handleAddBlock} />
      <EditBlockModal block={selectedBlock} />
      {deleteBlockId && <DeleteConfirmationModal deleteBlockId={deleteBlockId} onConfirmDelete={confirmDeleteBlock} onCancelDelete={() => setDeleteBlockId(null)} />}
    </div>
  );
}
