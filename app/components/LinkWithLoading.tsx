"use client";

import { useLinkStatus } from "next/link";

export default function LinkWithLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useLinkStatus();

  return (
    <div className="mt-4">
      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium inline-flex items-center">
        {pending ? "Loading..." : children}
      </span>
    </div>
  );
}
