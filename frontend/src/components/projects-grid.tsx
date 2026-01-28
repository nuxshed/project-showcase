"use client";

import { useQueryState } from "nuqs";
import { getProjects } from "@/lib/data/loader";
import { ProjectCard } from "@/components/project-card";
import { useMemo } from "react";

export function ProjectsGrid() {
    const projects = getProjects();
    const [selectedTag, setSelectedTag] = useQueryState("tag");
    const [searchQuery, setSearchQuery] = useQueryState("q", { defaultValue: "" });

    const filteredProjects = useMemo(() => {
        let filtered = projects;

        if (selectedTag) {
            filtered = filtered.filter((p) => p.tags.includes(selectedTag));
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [projects, selectedTag, searchQuery]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground font-mono text-sm">
                        No projects found
                    </p>
                </div>
            ) : (
                filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onTagClick={setSelectedTag}
                    />
                ))
            )}
        </div>
    );
}
