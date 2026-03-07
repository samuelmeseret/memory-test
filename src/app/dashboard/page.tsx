"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FamilyMember } from "@/types";
import FamilyMemberCard from "@/components/FamilyMemberCard";

export default function DashboardPage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    fetch("/api/family-members")
      .then(async (res) => (res.ok ? res.json() : []))
      .then((data: FamilyMember[]) => {
        if (!isActive) {
          return;
        }

        setMembers(data);
        setLoading(false);
      })
      .catch(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/family-members/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Your Family</h1>
        <p className="mt-3 text-xl leading-relaxed text-slate-600">
          What would you like to do today?
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/add"
          className="group flex flex-col items-center justify-center rounded-3xl bg-indigo-600 p-8 text-center text-white shadow-lg shadow-indigo-900/20 transition-all hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98]"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/50 shadow-inner group-hover:bg-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-2xl font-bold">Add a Family Member</span>
        </Link>
        <Link
          href="/dashboard/identify"
          className="group flex flex-col items-center justify-center rounded-3xl bg-emerald-600 p-8 text-center text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/50 shadow-inner group-hover:bg-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold">Who Is This?</span>
        </Link>
      </div>

      <section aria-label="Family members list" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Saved Family Members</h2>
        {loading ? (
          <p className="mt-6 text-xl text-slate-500" aria-live="polite">
            Loading your family...
          </p>
        ) : members.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200/60">
            <p className="text-xl text-slate-600">
              You haven&apos;t added anyone yet. Add a family member to get started!
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {members.map((member) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
