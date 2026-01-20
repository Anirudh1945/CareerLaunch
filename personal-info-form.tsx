"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PersonalInfoForm({ resume, setResume }: { resume: any; setResume: (resume: any) => void }) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Professional Title</label>
        <Input
          value={resume.job_role || ""}
          onChange={(e) => setResume({ ...resume, job_role: e.target.value })}
          placeholder="e.g., Senior Product Manager"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
        <Input
          value={resume.industry || ""}
          onChange={(e) => setResume({ ...resume, industry: e.target.value })}
          placeholder="e.g., Technology, Finance, Healthcare"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Professional Summary</label>
        <Textarea
          value={resume.summary || ""}
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          placeholder="A brief overview of your professional background and career goals..."
          rows={6}
        />
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">AI Optimization Suggestions</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Use industry keywords relevant to your target position</li>
          <li>✓ Keep your summary to 3-4 impactful sentences</li>
          <li>✓ Include specific achievements and metrics when possible</li>
          <li>✓ Tailor your summary to the job role you're targeting</li>
        </ul>
      </div>
    </Card>
  )
}
