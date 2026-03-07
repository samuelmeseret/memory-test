"use client";

import { useRef } from "react";
import { compressImage, fileToBase64 } from "@/lib/image-utils";

interface CameraProps {
  onCapture: (file: File, preview: string) => void;
  label?: string;
}

export default function Camera({ onCapture, label = "Take a Photo" }: CameraProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file);
    const preview = await fileToBase64(compressed);
    onCapture(compressed, preview);
    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-4">
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="flex h-20 w-full items-center justify-center gap-3 rounded-3xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-1 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {label}
        </button>
        <button
          onClick={() => galleryInputRef.current?.click()}
          className="flex h-20 w-full items-center justify-center gap-3 rounded-3xl bg-slate-50 text-xl font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Choose from Gallery
        </button>
        {/* Camera input - opens native camera on iOS */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        {/* Gallery input - opens photo library on iOS */}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
