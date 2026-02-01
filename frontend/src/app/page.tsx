import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { FilterBar } from "@/components/filter-bar";
import { ProjectsGrid } from "@/components/projects-grid";
import { getProjects } from "@/lib/data/loader";
import { Suspense } from "react";

export default function Home() {
  const projects = getProjects();
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="border-b-2 border-border h-[73px]" />}>
        <Header />
      </Suspense>

      <Suspense fallback={<div className="h-96 border-b-2 border-border" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="h-16 border-b-2 border-border" />}>
        <FilterBar allTags={allTags} />
      </Suspense>

      <section className="container mx-auto px-4 py-6 min-h-screen">
        <Suspense fallback={<div className="text-center py-12 font-mono text-sm text-muted-foreground">Loading...</div>}>
          <ProjectsGrid />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
