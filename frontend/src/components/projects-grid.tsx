"use client";

import { useQueryState } from "nuqs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/data/loader";
import { ProjectCard } from "@/components/project-card";

export function ProjectsGrid() {
    const projects = getProjects();
    const [selectedTag, setSelectedTag] = useQueryState("tag");

    const filteredProjects = selectedTag
        ? projects.filter((p) => p.tags.includes(selectedTag))
        : projects;

    return (
        <>
            {selectedTag && (
                <div className="mb-6 flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">
                        Filtering by:
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedTag(null)}
                        className="border font-mono text-xs"
                    >
                        {selectedTag}
                        <X className="ml-2 h-3 w-3" />
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onTagClick={setSelectedTag}
                    />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground font-mono text-sm">
                        No projects found with tag "{selectedTag}"
                    </p>
                </div>
            )}
        </>
    );
}
