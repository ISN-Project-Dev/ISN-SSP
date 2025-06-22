"use client";

import { useTransition } from "react";
import { logout } from "@/features/auth/servers/logoutAction";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
      disabled={isPending}
    >
      Logout
    </button>
  );
}
