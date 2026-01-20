"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, MoreVertical } from "lucide-react"
import ResumeBuilder from "@/components/resume-builder"

export default function Dashboard({ user }: { user: any }) {
  const [resumes, setResumes] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchResumes()
  }, [user])

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })

      if (error) throw error
      setResumes(data || [])
    } catch (error) {
      console.error("Error fetching resumes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateResume = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          title: "New Resume",
          template_name: "professional",
        })
        .select()
        .single()

      if (error) throw error
      setSelectedResume(data)
      setResumes([data, ...resumes])
    } catch (error) {
      console.error("Error creating resume:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleResumeDeleted = () => {
    fetchResumes()
  }

  if (selectedResume) {
    return (
      <ResumeBuilder
        resume={selectedResume}
        onBack={() => {
          setSelectedResume(null)
          fetchResumes()
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">CareerLaunch</h1>
              <p className="text-xs text-muted-foreground mt-1">AI-Powered Resume Builder</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-sm text-foreground">{user.email}</span>
                <span className="text-xs text-muted-foreground">Premium User</span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Your Resumes</h2>
            <p className="text-muted-foreground mt-2">
              {resumes.length === 0
                ? "Create your first resume to get started"
                : `You have ${resumes.length} resume${resumes.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Button onClick={handleCreateResume} size="lg" className="w-full sm:w-auto">
            <Plus size={20} className="mr-2" />
            Create New Resume
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          // Empty State
          <Card className="p-12 text-center border-2 border-dashed border-border">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Plus size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first resume to start building a professional document optimized by AI.
                </p>
                <Button onClick={handleCreateResume}>Create Your First Resume</Button>
              </div>
            </div>
          </Card>
        ) : (
          // Resumes Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Resume key={resume.id} resume={resume} onSelect={setSelectedResume} onDelete={handleResumeDeleted} />
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {resumes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
            <StatsCard label="Total Resumes" value={resumes.length.toString()} />
            <StatsCard label="Last Updated" value={getLastUpdated(resumes[0])} />
            <StatsCard label="Industries" value={getUniqueIndustries(resumes).toString()} />
            <StatsCard label="Templates" value={getUniqueTemplates(resumes).toString()} />
          </div>
        )}
      </main>
    </div>
  )
}

function Resume({
  resume,
  onSelect,
  onDelete,
}: {
  resume: any
  onSelect: (resume: any) => void
  onDelete: () => void
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Delete this resume? This action cannot be undone.")) return
    try {
      const { error } = await supabase.from("resumes").delete().eq("id", resume.id)
      if (error) throw error
      onDelete()
    } catch (error) {
      console.error("Error deleting resume:", error)
    }
  }

  const handleDuplicate = async () => {
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
      onDelete()
    } catch (error) {
      console.error("Error duplicating resume:", error)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group" onClick={() => onSelect(resume)}>
      <div className="relative mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <span className="text-lg">📄</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className="absolute top-0 right-0 p-2 hover:bg-muted rounded-lg"
        >
          <MoreVertical size={16} className="text-muted-foreground" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-10 bg-card border border-border rounded-lg shadow-lg z-20 w-40">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDuplicate()
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              Duplicate
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 truncate">{resume.title}</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {resume.industry && (
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
            {resume.industry}
          </span>
        )}
        {resume.job_role && (
          <span className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-medium">
            {resume.job_role}
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground">Updated {formatDate(resume.updated_at || resume.created_at)}</p>
    </Card>
  )
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-primary mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

function getLastUpdated(resume: any): string {
  return formatDate(resume.updated_at || resume.created_at)
}

function getUniqueIndustries(resumes: any[]): number {
  return new Set(resumes.map((r) => r.industry).filter(Boolean)).size
}

function getUniqueTemplates(resumes: any[]): number {
  return new Set(resumes.map((r) => r.template_name)).size
}
