"use client";

import { useLinkStatus } from "next/link";

function ReactMoreButton() {
  const { pending } = useLinkStatus();
  return (
    <span className="text-blue-600 dark:text-blue-400 text-sm mt-3 inline-block">
      {pending ? "Loading..." : "Read more →"}
    </span>
  );
}

export default ReactMoreButton;
