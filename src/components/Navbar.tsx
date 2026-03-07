"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setName(user.user_metadata?.full_name || user.email || "");
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <a href="/dashboard" className="text-2xl font-extrabold tracking-tight text-indigo-700 transition-colors hover:text-indigo-800">
          Memory Lane
        </a>
        <div className="flex items-center gap-4">
          {name && (
            <span className="hidden text-lg font-medium text-slate-600 sm:inline">
              Hi, {name.split(" ")[0]}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="rounded-full bg-slate-100 px-5 py-2.5 text-lg font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-[0.98]"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
}
