"use client";

import { useState, FormEvent } from "react";
import { Block, BlockType } from "@/lib/types/blocks";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useBlock } from "@/lib/hooks/useBlock";

const blockTypes = ["hero", "features"] as const;

interface AddBlockFormProps {
  onCancel?: () => void;
  onAdd?: (block: Block) => void;
}

export function AddBlockForm({ onCancel, onAdd }: AddBlockFormProps) {
  const { addBlock } = useBlock();
  const { selectedPage } = useCmsContext();
  const [selectedType, setSelectedType] = useState<BlockType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  

  const filteredBlockTypes = blockTypes.filter(type => 
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newBlock = {
    type: selectedType,
    content: {},
    settings: {},
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (selectedType && selectedPage?.id) {
      
      addBlock({ ...newBlock, pageId: selectedPage.id });
      
      if (onAdd) {
        onAdd(newBlock as Block);
      }
      
      setSelectedType(null);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search block type..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="p-1">
          <h4 className="font-medium p-2 text-sm">Blocks</h4>
          
          {filteredBlockTypes.length === 0 ? (
            <div className="px-2 py-3 text-sm text-gray-500">No block type found.</div>
          ) : (
            <ul className="max-h-60 overflow-auto">
              {filteredBlockTypes.map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-2 py-2 text-sm flex items-center
                      ${selectedType === type 
                        ? "bg-gray-200 font-medium border-l-4 border-blue-600" 
                        : "hover:bg-gray-100"
                      }`}
                  >
                    <span className={`mr-2 ${selectedType === type ? "opacity-100" : "opacity-0"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {type.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Form actions */}
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!selectedType}
          className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            !selectedType 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Add Block
        </button>
      </div>
    </form>
  );
}