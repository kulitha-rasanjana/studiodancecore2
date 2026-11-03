import { useEffect, useState } from "react";
import { X, CircleUserRound, Mail, LockKeyhole, LogOut } from "lucide-react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  user?: AuthUser | null;
  onLogin?: (email: string, password: string) => Promise<void>;
  onLogout?: () => Promise<void>;
}

export default function LoginPopup({
  open,
  onClose,
  user = null,
  onLogin,
  onLogout,
}: LoginPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onLogin) return;

    setBusy(true);
    setError("");

    try {
      await onLogin(email, password);
      setPassword("");
      onClose();
    } catch {
      setError("Unable to sign in. Please check your credentials.");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    if (!onLogout) return;
    setBusy(true);
    setError("");

    try {
      await onLogout();
      onClose();
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#081725] p-6 text-white shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 text-white/60 hover:text-white"
        >
          <X size={22} />
        </button>

        <div className="mb-6 flex flex-col items-center gap-3">
          <CircleUserRound size={54} className="text-violet-300" />
          <h2 id="login-title" className="text-xl font-bold">
            {user ? "MY ACCOUNT" : "WELCOME BACK"}
          </h2>
        </div>

        {user ? (
          <div className="space-y-5">
            <div className="rounded-xl bg-white/5 p-5">
              <p className="mb-1 text-xs text-white/50">NAME</p>
              <p className="font-medium">{user.name}</p>

              <p className="mb-1 mt-5 text-xs text-white/50">EMAIL</p>
              <p className="break-all font-medium">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={busy || !onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/40 px-4 py-3 font-semibold text-red-300 transition-colors hover:bg-red-400/10 disabled:opacity-50"
            >
              <LogOut size={18} />
              {busy ? "Logging out..." : "LOGOUT"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-white/40"
                size={19}
              />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-11 pr-4 outline-none focus:border-violet-400"
              />
            </div>

            <div className="relative">
              <LockKeyhole
                className="absolute left-3 top-3.5 text-white/40"
                size={19}
              />
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-11 pr-4 outline-none focus:border-violet-400"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !onLogin}
              className="w-full rounded-lg bg-violet-500 py-3 font-bold transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "SIGNING IN..." : "LOGIN"}
            </button>

            {!onLogin && (
              <p className="text-center text-xs text-white/50">
                Login will be enabled after Supabase integration.
              </p>
            )}
          </form>
        )}

        {error && user && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
