"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FamilyMember } from "@/types";
import FamilyMemberCard from "@/components/FamilyMemberCard";

export default function DashboardPage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    const res = await fetch("/api/family-members");
    if (res.ok) {
      const data = await res.json();
      setMembers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/family-members/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Your Family</h1>
      <p className="mt-2 text-xl text-gray-600">
        What would you like to do?
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/add"
          className="flex h-32 flex-col items-center justify-center rounded-2xl bg-blue-700 text-center text-white shadow-md transition-all hover:bg-blue-800 hover:shadow-lg active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="mt-2 text-xl font-semibold">Add a Family Member</span>
        </Link>
        <Link
          href="/dashboard/identify"
          className="flex h-32 flex-col items-center justify-center rounded-2xl bg-green-700 text-center text-white shadow-md transition-all hover:bg-green-800 hover:shadow-lg active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="mt-2 text-xl font-semibold">Who Is This?</span>
        </Link>
      </div>

      <section className="mt-10" aria-label="Family members list">
        <h2 className="text-2xl font-bold text-gray-900">Family Members</h2>
        {loading ? (
          <p className="mt-4 text-xl text-gray-500" aria-live="polite">
            Loading...
          </p>
        ) : members.length === 0 ? (
          <p className="mt-4 text-xl text-gray-500">
            No family members yet. Add someone to get started!
          </p>
        ) : (
          <div className="mt-4 space-y-3">
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
