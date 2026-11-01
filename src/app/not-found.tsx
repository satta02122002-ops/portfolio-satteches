import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-grid">
        <div className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
          <p className="label text-muted">Tracking status · 404</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">Shipment not found.</h1>
          <p className="mt-4 max-w-xl text-muted">
            This page isn&apos;t on the manifest. It may have moved, or the link has a typo.
          </p>
          <p className="mt-6">
            <span className="chip chip-accent">Return to sender</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">Back to the home page</Link>
            <Link href="/cv" className="btn btn-ghost">View the CV</Link>
          </div>
        </div>
      </main>
    </>
  );
}
