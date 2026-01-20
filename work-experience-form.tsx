"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

export default function WorkExperienceForm({
  experiences,
  setExperiences,
}: {
  experiences: any[]
  setExperiences: (experiences: any[]) => void
}) {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: `new-${Date.now()}`,
        company_name: "",
        job_title: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: "",
      },
    ])
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <Card key={experience.id} className="p-6 space-y-4 relative">
          <button
            onClick={() => removeExperience(experience.id)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Remove experience"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
              <Input
                value={experience.company_name}
                onChange={(e) => updateExperience(experience.id, "company_name", e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
              <Input
                value={experience.job_title}
                onChange={(e) => updateExperience(experience.id, "job_title", e.target.value)}
                placeholder="Your job title"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
              <Input
                type="date"
                value={experience.start_date}
                onChange={(e) => updateExperience(experience.id, "start_date", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
              <Input
                type="date"
                value={experience.end_date}
                onChange={(e) => updateExperience(experience.id, "end_date", e.target.value)}
                disabled={experience.is_current}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${experience.id}`}
              checked={experience.is_current}
              onChange={(e) => updateExperience(experience.id, "is_current", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={`current-${experience.id}`} className="text-sm text-foreground">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description & Achievements</label>
            <Textarea
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
              placeholder="Describe your responsibilities and key achievements..."
              rows={4}
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              💡 Use action verbs (Led, Developed, Managed) and include metrics (15% improvement, $2M revenue)
            </p>
          </div>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
        <Plus size={20} className="mr-2" />
        Add Experience
      </Button>
    </div>
  )
}
