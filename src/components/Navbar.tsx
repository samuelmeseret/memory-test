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
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <a href="/dashboard" className="text-xl font-bold text-blue-800">
          Memory Helper
        </a>
        <div className="flex items-center gap-4">
          {name && (
            <span className="hidden text-lg text-gray-600 sm:inline">
              Hi, {name.split(" ")[0]}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="rounded-xl bg-gray-100 px-4 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
}
