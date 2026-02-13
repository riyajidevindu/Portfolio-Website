import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background grid-bg px-6 text-center">
      <div className="relative">
        <h1 className="text-[120px] font-bold leading-none sm:text-[180px]">
          <span className="gradient-text">404</span>
        </h1>
        <div className="absolute inset-0 blur-[100px] bg-primary/10 -z-10" />
      </div>
      <p className="mt-4 text-xl font-medium text-foreground/60">
        Page not found
      </p>
      <p className="mt-2 max-w-md text-sm text-foreground/40">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-background transition-all hover:shadow-lg hover:shadow-primary/25"
      >
        Go Home
      </Link>
    </div>
  );
}
