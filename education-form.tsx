"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

export default function EducationForm({
  education,
  setEducation,
}: {
  education: any[]
  setEducation: (education: any[]) => void
}) {
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: `new-${Date.now()}`,
        school_name: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        gpa: "",
      },
    ])
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: string, value: any) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <Card key={edu.id} className="p-6 space-y-4 relative">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Remove education"
          >
            <X size={20} />
          </button>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">School/University</label>
            <Input
              value={edu.school_name}
              onChange={(e) => updateEducation(edu.id, "school_name", e.target.value)}
              placeholder="University name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                placeholder="e.g., Bachelor of Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Field of Study</label>
              <Input
                value={edu.field_of_study}
                onChange={(e) => updateEducation(edu.id, "field_of_study", e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
              <Input
                type="date"
                value={edu.start_date}
                onChange={(e) => updateEducation(edu.id, "start_date", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
              <Input
                type="date"
                value={edu.end_date}
                onChange={(e) => updateEducation(edu.id, "end_date", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">GPA</label>
              <Input
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                placeholder="e.g., 3.8"
                type="number"
                step="0.01"
                min="0"
                max="4"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
        <Plus size={20} className="mr-2" />
        Add Education
      </Button>
    </div>
  )
}
