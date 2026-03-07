"use client";

import { useState } from "react";
import Camera from "@/components/Camera";
import IdentifyResult from "@/components/IdentifyResult";
import BackButton from "@/components/BackButton";
import { IdentifyResult as IdentifyResultType } from "@/types";
import { fileToBase64 } from "@/lib/image-utils";

export default function IdentifyPage() {
  const [status, setStatus] = useState<"capture" | "loading" | "result">("capture");
  const [result, setResult] = useState<IdentifyResultType | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string>("");
  const [error, setError] = useState("");

  const handleCapture = async (file: File, preview: string) => {
    setCapturedPreview(preview);
    setStatus("loading");
    setError("");

    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: base64 }),
      });

      if (!res.ok) throw new Error("Identification failed");

      const data = await res.json();
      setResult(data);
      setStatus("result");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("capture");
    }
  };

  const handleTryAgain = () => {
    setStatus("capture");
    setResult(null);
    setCapturedPreview("");
    setError("");
  };

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <BackButton />
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Who Is This?</h1>
      </div>

      {status === "capture" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-xl leading-relaxed text-slate-600">
            Take a clear photo of someone to confidently find out who they are.
          </p>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 sm:p-8">
            <Camera onCapture={handleCapture} label="Take a Photo" />
          </div>
          {error && (
            <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
              <p className="text-center text-lg font-medium text-red-800" role="alert">
                {error}
              </p>
            </div>
          )}
        </div>
      )}

      {status === "loading" && (
        <div className="mt-12 flex flex-col items-center gap-10 animate-in fade-in duration-500">
          {capturedPreview && (
            <div className="overflow-hidden rounded-full p-2 ring-4 ring-indigo-100">
              <img
                src={capturedPreview}
                alt="Captured photo"
                className="h-56 w-56 rounded-full object-cover shadow-lg"
              />
            </div>
          )}
          <div className="flex flex-col items-center text-center" aria-live="polite">
            <p className="text-2xl font-bold text-indigo-700 animate-pulse">Looking for a match...</p>
            <div className="mt-6 flex h-3 w-64 overflow-hidden rounded-full bg-indigo-100 shadow-inner">
              <div className="h-full animate-[progress_2s_ease-in-out_infinite] rounded-full bg-indigo-600" style={{ width: "60%" }} />
            </div>
            <style jsx>{`
              @keyframes progress {
                0% { transform: translateX(-100%); width: 50%; }
                100% { transform: translateX(200%); width: 50%; }
              }
            `}</style>
          </div>
        </div>
      )}

      {status === "result" && result && (
        <div className="mt-8 space-y-8 animate-in zoom-in-95 duration-500">
          {capturedPreview && (
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-full p-2 ring-4 ring-indigo-50">
                <img
                  src={capturedPreview}
                  alt="Captured photo"
                  className="h-48 w-48 rounded-full object-cover shadow-md"
                />
              </div>
            </div>
          )}
          <IdentifyResult result={result} />
          <button
            onClick={handleTryAgain}
            className="flex h-20 w-full items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-1 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-[0.98]"
          >
            Try Another Photo
          </button>
        </div>
      )}
    </div>
  );
}
