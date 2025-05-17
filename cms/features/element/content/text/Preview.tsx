import React from "react";

export function PreviewText() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Preview Title</h1>
      <p className="text-gray-600">This is a preview description.</p>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          CTA 1
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          CTA 2
        </button>
      </div>
    </div>
  );
}