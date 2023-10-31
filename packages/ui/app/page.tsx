"use client";

import Swap from "./_components/swap/swap";

export default function Home() {
  return (
    <>
      <div id="background-image" />

      <main className="flex flex-col items-center justify-between  space-y-12 p-6 text-center">
        <Swap />
      </main>
    </>
  );
}
