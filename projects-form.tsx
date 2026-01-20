"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

export default function ProjectsForm({
  projects,
  setProjects,
}: {
  projects: any[]
  setProjects: (projects: any[]) => void
}) {
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: `new-${Date.now()}`,
        project_name: "",
        project_link: "",
        technologies: "",
        description: "",
        start_date: "",
        end_date: "",
      },
    ])
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
  }

  const updateProject = (id: string, field: string, value: any) => {
    setProjects(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-6 space-y-4 relative">
          <button
            onClick={() => removeProject(project.id)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Remove project"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
              <Input
                value={project.project_name}
                onChange={(e) => updateProject(project.id, "project_name", e.target.value)}
                placeholder="e.g., E-commerce Platform"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Link</label>
              <Input
                type="url"
                value={project.project_link}
                onChange={(e) => updateProject(project.id, "project_link", e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Technologies</label>
            <Input
              value={project.technologies}
              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
              placeholder="React, Node.js, PostgreSQL, TypeScript"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
              <Input
                type="date"
                value={project.start_date}
                onChange={(e) => updateProject(project.id, "start_date", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
              <Input
                type="date"
                value={project.end_date}
                onChange={(e) => updateProject(project.id, "end_date", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, "description", e.target.value)}
              placeholder="Describe what the project does and your key contributions..."
              rows={4}
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              💡 Highlight the impact (e.g., Used by 10K+ users, 5K+ GitHub stars) and your technical contributions
            </p>
          </div>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
        <Plus size={20} className="mr-2" />
        Add Project
      </Button>
    </div>
  )
}
