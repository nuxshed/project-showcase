"use client";

import { Project } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col border-2 transition-all hover:border-foreground/25">
      <CardHeader className="border-b-2">
        <CardTitle className="text-lg font-bold uppercase tracking-wider">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow pt-4">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-mono border">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t-2 pt-4">
        <div className="flex flex-col gap-1">
          {project.authors.map((author, i) => (
            author.site ? (
              <Link
                key={i}
                href={author.site}
                target="_blank"
                className="text-xs font-mono text-muted-foreground hover:text-foreground hover:underline transition-colors"
              >
                {author.name}
              </Link>
            ) : (
              <span key={i} className="text-xs font-mono text-muted-foreground">
                {author.name}
              </span>
            )
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild className="border-2">
            <Link href={project.links.repo} target="_blank">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          {project.links.demo && (
            <Button variant="outline" size="icon" asChild className="border-2">
              <Link href={project.links.demo} target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
