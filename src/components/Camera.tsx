"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { compressImage, fileToBase64 } from "@/lib/image-utils";

interface CameraProps {
  onCapture: (file: File, preview: string) => void;
  label?: string;
}

export default function Camera({ onCapture, label = "Take a Photo" }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setError("");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1024 }, height: { ideal: 1024 } },
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setError("Could not access camera. Please use the upload button instead.");
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    stopCamera();

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const compressed = await compressImage(file);
      const preview = await fileToBase64(compressed);
      onCapture(compressed, preview);
    }, "image/jpeg", 0.85);
  };

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
    <div className="flex flex-col items-center gap-4">
      {cameraActive ? (
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-2xl"
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={capturePhoto}
              className="flex-1 rounded-2xl bg-blue-700 py-4 text-xl font-semibold text-white transition-colors hover:bg-blue-800 active:scale-[0.98]"
            >
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="rounded-2xl bg-gray-200 px-6 py-4 text-xl font-semibold text-gray-700 transition-colors hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-md flex-col gap-3">
          <button
            onClick={startCamera}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 text-xl font-semibold text-white transition-colors hover:bg-blue-800 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {label}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-gray-100 text-xl font-semibold text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-200 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Choose from Gallery
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
      {error && (
        <p className="text-center text-lg text-red-600" role="alert">
          {error}
        </p>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
