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
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900">Who Is This?</h1>

      {status === "capture" && (
        <>
          <p className="mt-2 text-xl text-gray-600">
            Take a photo of someone to find out who they are.
          </p>
          <div className="mt-6">
            <Camera onCapture={handleCapture} label="Take a Photo" />
          </div>
          {error && (
            <p className="mt-4 text-center text-lg text-red-600" role="alert">
              {error}
            </p>
          )}
        </>
      )}

      {status === "loading" && (
        <div className="mt-8 flex flex-col items-center gap-6">
          {capturedPreview && (
            <img
              src={capturedPreview}
              alt="Captured photo"
              className="h-48 w-48 rounded-2xl object-cover"
            />
          )}
          <div className="text-center" aria-live="polite">
            <p className="text-2xl text-gray-600">Looking for a match...</p>
            <div className="mt-4 h-2 w-48 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full animate-pulse rounded-full bg-blue-600" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      )}

      {status === "result" && result && (
        <div className="mt-6 space-y-6">
          {capturedPreview && (
            <div className="flex justify-center">
              <img
                src={capturedPreview}
                alt="Captured photo"
                className="h-48 w-48 rounded-2xl object-cover"
              />
            </div>
          )}
          <IdentifyResult result={result} />
          <button
            onClick={handleTryAgain}
            className="h-16 w-full rounded-2xl bg-blue-700 text-xl font-semibold text-white transition-colors hover:bg-blue-800 active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
