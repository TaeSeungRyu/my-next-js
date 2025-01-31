"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function SegmentExample() {
  const segment = useSelectedLayoutSegment();

  return (
    <div>
      <div className="text-blue-400  dark:text-green">
        <p>현재 segment: {segment}</p>
      </div>
    </div>
  );
}
