import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 py-8">
      <section className="bg-card w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <p className="text-muted-foreground text-sm font-medium">404</p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>

        <p className="text-muted-foreground mt-3 text-sm leading-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex rounded-md px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}
