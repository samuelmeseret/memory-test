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
      <div className="mx-auto max-w-lg space-y-8">
        <BackButton />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Add a Family Member
          </h1>
          <p className="mt-3 text-xl leading-relaxed text-slate-600">
            What is their name?
          </p>
        </div>
        <form onSubmit={handleNameSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
            className="h-20 w-full rounded-3xl border-0 bg-white px-6 text-2xl font-medium text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-4 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
            autoFocus
            required
          />
          <button
            type="submit"
            className="flex h-20 w-full items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-1 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-[0.98]"
          >
            Next
          </button>
        </form>
      </div>
    );
  }

  if (step === "saving") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-2xl font-medium text-slate-600" aria-live="polite">
          Saving {name}...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <BackButton />
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Photos of {name}
        </h1>
        <p className="mt-3 text-xl leading-relaxed text-slate-600">
          Add one or more photos. More photos means better matching.
        </p>
      </div>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <div key={index} className="group relative">
              <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200/60">
                <img
                  src={photo.preview}
                  alt={`Photo ${index + 1} of ${name}`}
                  className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                aria-label={`Remove photo ${index + 1}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 sm:p-8">
        <Camera onCapture={handleCapture} label="Take a Photo" />
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
          <p className="text-center text-lg font-medium text-red-800" role="alert">
            {error}
          </p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={photos.length === 0}
        className="mt-8 flex h-20 w-full items-center justify-center rounded-3xl bg-emerald-600 text-2xl font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:pointer-events-none disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none active:scale-[0.98]"
      >
        Save {name}
      </button>
    </div>
  );
}
