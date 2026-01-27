import { ProjectSchema, type Project } from "@/lib/schemas";
import projectsData from "./projects.json";

export function getProjects(): Project[] {
    const parsed = projectsData.map((project) => ProjectSchema.parse(project));
    return parsed;
}
