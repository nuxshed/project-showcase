"use client";

import { useQueryState } from "nuqs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <>
            {(selectedTag || searchQuery) && (
                <div className="mb-6 flex items-center gap-2 flex-wrap">
                    {searchQuery && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-muted-foreground">
                                Search:
                            </span>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setSearchQuery("")}
                                className="border font-mono text-xs"
                            >
                                {searchQuery}
                                <X className="ml-2 h-3 w-3" />
                            </Button>
                        </div>
                    )}
                    {selectedTag && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-muted-foreground">
                                Tag:
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
                        No projects found
                    </p>
                </div>
            )}
        </>
    );
}
