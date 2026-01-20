"use client"

import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Copy } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

export default function ResumeList({
  resumes,
  onSelectResume,
}: { resumes: any[]; onSelectResume: (resume: any) => void }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const { error } = await supabase.from("resumes").delete().eq("id", id)
      if (error) throw error
      window.location.reload()
    } catch (error) {
      console.error("Error deleting resume:", error)
    }
  }

  const handleDuplicate = async (resume: any) => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .insert({
          user_id: resume.user_id,
          title: `${resume.title} (Copy)`,
          template_name: resume.template_name,
          summary: resume.summary,
          industry: resume.industry,
          job_role: resume.job_role,
        })
        .select()
        .single()

      if (error) throw error
      window.location.reload()
    } catch (error) {
      console.error("Error duplicating resume:", error)
    }
  }

  return (
    <div className="grid gap-4">
      {resumes.map((resume) => (
        <Card
          key={resume.id}
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectResume(resume)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">{resume.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {resume.industry && (
                  <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {resume.industry}
                  </span>
                )}
                {resume.job_role && (
                  <span className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded text-sm">
                    {resume.job_role}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Updated {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDuplicate(resume)
                }}
                variant="outline"
                size="sm"
              >
                <Copy size={16} className="mr-2" />
                Duplicate
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(resume.id)
                }}
                variant="destructive"
                size="sm"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
