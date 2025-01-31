"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/contexts/AppContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [user, router]);

  const isProfileIncomplete = user && (!user.name || !user.ownerName || !user.address?.city);

  return (
    <div className="min-h-screen bg-gray-100 text-slate-950">
      {isProfileIncomplete && (
        <div className="bg-yellow-200 text-yellow-800 py-2 px-4 text-center">
          Your profile is incomplete.{" "}
          <Link href="/update-profile" className="underline font-semibold hover:text-yellow-600">Update now</Link>
        </div>
      )}
      {user && (
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome to the Kitchen App!</h1>
          <p>Explore your dashboard and manage your kitchen effectively.</p>
        </div>
      )}
    </div>
  );
}
