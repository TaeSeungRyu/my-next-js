"use client";

import { useQuery } from "@tanstack/react-query";

export function HydrateExample() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["someKey"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data.</p>;
  return (
    <>
      <div>{JSON.stringify(data, null, 1)}</div>
    </>
  );
}
