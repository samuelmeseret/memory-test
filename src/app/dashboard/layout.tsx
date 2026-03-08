import Navbar from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
