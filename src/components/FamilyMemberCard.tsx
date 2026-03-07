"use client";

import { FamilyMember } from "@/types";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

interface FamilyMemberCardProps {
  member: FamilyMember;
  onDelete: (id: string) => void;
}

export default function FamilyMemberCard({ member, onDelete }: FamilyMemberCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const photoUrl = member.photos?.[0]?.photo_url;

  return (
    <>
      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl text-gray-400">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
          <p className="text-lg text-gray-500">
            {member.photos?.length || 0} photo{(member.photos?.length || 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="rounded-xl p-3 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          aria-label={`Delete ${member.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <ConfirmDialog
        open={showConfirm}
        title="Remove Family Member"
        message={`Are you sure you want to remove ${member.name}? This will delete all their photos too.`}
        confirmLabel="Yes, Remove"
        onConfirm={() => {
          onDelete(member.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
