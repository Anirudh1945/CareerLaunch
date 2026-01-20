"use client"

import { templates } from "@/components/resume-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Resume Template</h3>
        <p className="text-sm text-muted-foreground mb-4">Choose a professional template for your resume</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(templates).map(([key, template]) => (
          <Card
            key={key}
            className={`p-4 cursor-pointer transition-all ${
              selectedTemplate === key
                ? "border-2 border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelectTemplate(key)}
          >
            <h4 className="font-semibold mb-2">{template.name}</h4>
            <p className="text-xs text-muted-foreground mb-4">{template.description}</p>
            <div className="space-y-2 mb-4">
              <div className="h-2 bg-gray-200 rounded w-3/4" />
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="h-2 bg-gray-200 rounded w-5/6" />
            </div>
            <Button
              variant={selectedTemplate === key ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onSelectTemplate(key)
              }}
            >
              {selectedTemplate === key ? "Selected" : "Select"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
