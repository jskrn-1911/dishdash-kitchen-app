"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/AppContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [user, router]);

  return user ? (
    <div className="text-slate-950">
      Welcome to the Kitchen App!
    </div>
  ) : null; // Optionally, show a loader until redirect happens
}
