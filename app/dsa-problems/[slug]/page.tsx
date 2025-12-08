import { getProblemBySlug, dsaProblems } from "@/lib/dsaProblems";
import ProblemDetailClient from "./ProblemDetailClient";

// Generate static params for all problems
export function generateStaticParams() {
  return dsaProblems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  console.log("Resolved slug:", resolvedParams.slug);
  const problem = getProblemBySlug(resolvedParams.slug);
  console.log("Found problem:", problem?.title || "Not found");

  return <ProblemDetailClient problem={problem} />;
}
