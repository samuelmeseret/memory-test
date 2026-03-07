"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Camera from "@/components/Camera";
import BackButton from "@/components/BackButton";

interface PhotoEntry {
  file: File;
  preview: string;
}

export default function AddFamilyMemberPage() {
  const router = useRouter();
  const [step, setStep] = useState<"name" | "photos" | "saving">("name");
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [error, setError] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep("photos");
    }
  };

  const handleCapture = (file: File, preview: string) => {
    setPhotos((prev) => [...prev, { file, preview }]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (photos.length === 0) {
      setError("Please add at least one photo.");
      return;
    }

    setStep("saving");
    setError("");

    try {
      // Create the family member
      const memberRes = await fetch("/api/family-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!memberRes.ok) {
        const err = await memberRes.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create family member");
      }
      const member = await memberRes.json();

      // Upload each photo
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("photo", photo.file);

        const photoRes = await fetch(
          `/api/family-members/${member.id}/photos`,
          { method: "POST", body: formData }
        );

        if (!photoRes.ok) {
          const err = await photoRes.json().catch(() => ({}));
          throw new Error(err.error || "Failed to upload photo");
        }
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("photos");
    }
  };

  if (step === "name") {
    return (
      <div>
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900">
          Add a Family Member
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          What is their name?
        </p>
        <form onSubmit={handleNameSubmit} className="mt-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
            className="h-16 w-full rounded-2xl border-2 border-gray-200 px-5 text-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            autoFocus
            required
          />
          <button
            type="submit"
            className="mt-4 h-16 w-full rounded-2xl bg-blue-700 text-xl font-semibold text-white transition-colors hover:bg-blue-800 active:scale-[0.98]"
          >
            Next
          </button>
        </form>
      </div>
    );
  }

  if (step === "saving") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-2xl text-gray-600" aria-live="polite">
          Saving {name}...
        </p>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900">
        Photos of {name}
      </h1>
      <p className="mt-2 text-xl text-gray-600">
        Add one or more photos. More photos means better matching.
      </p>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.preview}
                alt={`Photo ${index + 1} of ${name}`}
                className="h-28 w-full rounded-xl object-cover"
              />
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow"
                aria-label={`Remove photo ${index + 1}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Camera onCapture={handleCapture} label="Take a Photo" />
      </div>

      {error && (
        <p className="mt-4 text-center text-lg text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={photos.length === 0}
        className="mt-6 h-16 w-full rounded-2xl bg-green-700 text-xl font-semibold text-white transition-colors hover:bg-green-800 disabled:bg-gray-300 disabled:text-gray-500"
      >
        Save {name}
      </button>
    </div>
  );
}
