import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-6 py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
