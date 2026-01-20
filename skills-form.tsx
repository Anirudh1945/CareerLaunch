"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

export default function SkillsForm({
  skills,
  setSkills,
}: {
  skills: any[]
  setSkills: (skills: any[]) => void
}) {
  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: `new-${Date.now()}`,
        skill_name: "",
        proficiency_level: "intermediate",
        category: "",
      },
    ])
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const updateSkill = (id: string, field: string, value: any) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const proficiencyLevels = ["beginner", "intermediate", "advanced", "expert"]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="p-4 flex items-end gap-4 relative">
            <button
              onClick={() => removeSkill(skill.id)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Remove skill"
            >
              <X size={20} />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Skill Name</label>
              <Input
                value={skill.skill_name}
                onChange={(e) => updateSkill(skill.id, "skill_name", e.target.value)}
                placeholder="e.g., React, Project Management"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Proficiency</label>
              <select
                value={skill.proficiency_level}
                onChange={(e) => updateSkill(skill.id, "proficiency_level", e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <Input
                value={skill.category}
                onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                placeholder="e.g., Technical"
              />
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={addSkill} variant="outline" className="w-full bg-transparent">
        <Plus size={20} className="mr-2" />
        Add Skill
      </Button>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">ATS Optimization Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Include specific technical skills and tools</li>
          <li>✓ Match keywords from job descriptions</li>
          <li>✓ List soft skills like Leadership, Communication</li>
          <li>✓ Organize skills by category for clarity</li>
        </ul>
      </div>
    </div>
  )
}
