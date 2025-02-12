"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function VercelBlobExample() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }
          const file = inputFileRef.current.files[0];
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/vercel-blob",
          });
          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          업로드 버튼 (회원가입해야함! 안하면 400오류)
        </button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
      <div className="mt-[55px]">
        <div>비디오 파일을 api에서 가져오는 샘플</div>
        <video controls src="/api/vercel-blob" />
      </div>
    </>
  );
}
