import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-[0.6rem] tracking-[0.5em] uppercase text-gold font-medium mb-6">
          Page Not Found
        </p>
        <h1 className="font-heading text-[clamp(3rem,8vw,7rem)] font-light text-ocean-deep leading-none mb-4">
          404
        </h1>
        <p className="text-text-light font-light mb-8 max-w-[400px] mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase font-medium text-ocean-deep hover:text-coral transition-colors"
        >
          <span className="w-8 h-px bg-current" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
