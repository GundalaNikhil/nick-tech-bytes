import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SystemDesignBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl">
      <div className="relative z-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex-1">
          <h2 className="text-2xl font-bold md:text-3xl">
            Getting Ready for Product Based Companies?
          </h2>
          <p className="mt-2 text-blue-100">
            Master system design concepts with real-world examples
          </p>
        </div>
        <Link
          href="#explore"
          className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:shadow-lg"
        >
          Explore Now
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
