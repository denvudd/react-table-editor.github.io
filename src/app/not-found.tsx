import React from "react";
import Link from "next/link";

import { getRandomJoke } from "@/actions/get-random-joke";

export default async function NotFound() {
  const joke = await getRandomJoke();

  return (
    <div className="container mt-12">
      <h2 className="text-2xl font-semibold text-center">Not Found</h2>
      <Link
        href="/table"
        className="text-xl font-semibold text-center mt-2 w-full block"
      >
        Return Home
      </Link>
      <p className="mt-8 text-gray-400 text-center block w-full">
        &quot;{joke}&quot;
      </p>
    </div>
  );
}
