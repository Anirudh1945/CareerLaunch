"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import PersonalInfoForm from "@/components/forms/personal-info-form"
import WorkExperienceForm from "@/components/forms/work-experience-form"
import EducationForm from "@/components/forms/education-form"
import SkillsForm from "@/components/forms/skills-form"
import ProjectsForm from "@/components/forms/projects-form"
import TemplateSelector from "@/components/template-selector"
import ResumePreview from "@/components/resume-preview"
import ExportOptions from "@/components/export-options"

export default function ResumeBuilder({ resume, onBack }: { resume: any; onBack: () => void }) {
  const [resumeData, setResumeData] = useState(resume)
  const [workExperience, setWorkExperience] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("personal")
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expRes, eduRes, skillsRes, projectsRes] = await Promise.all([
          supabase.from("work_experience").select("*").eq("resume_id", resume.id),
          supabase.from("education").select("*").eq("resume_id", resume.id),
          supabase.from("skills").select("*").eq("resume_id", resume.id),
          supabase.from("projects").select("*").eq("resume_id", resume.id),
        ])

        if (expRes.data) setWorkExperience(expRes.data)
        if (eduRes.data) setEducation(eduRes.data)
        if (skillsRes.data) setSkills(skillsRes.data)
        if (projectsRes.data) setProjects(projectsRes.data)
      } catch (error) {
        console.error("Error loading resume data:", error)
      }
    }

    loadData()
  }, [resume.id])

  const saveResume = async () => {
    setSaving(true)
    try {
      const { error: mainError } = await supabase
        .from("resumes")
        .update({
          title: resumeData.title,
          summary: resumeData.summary,
          industry: resumeData.industry,
          job_role: resumeData.job_role,
          template_name: resumeData.template_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", resume.id)

      if (mainError) throw mainError

      for (const exp of workExperience) {
        if (exp.id && exp.id.startsWith("new-")) {
          const { id, ...expData } = exp
          await supabase.from("work_experience").insert({
            ...expData,
            resume_id: resume.id,
          })
        } else if (exp.id) {
          const { id, ...expData } = exp
          await supabase.from("work_experience").update(expData).eq("id", exp.id)
        }
      }

      for (const edu of education) {
        if (edu.id && edu.id.startsWith("new-")) {
          const { id, ...eduData } = edu
          await supabase.from("education").insert({
            ...eduData,
            resume_id: resume.id,
          })
        } else if (edu.id) {
          const { id, ...eduData } = edu
          await supabase.from("education").update(eduData).eq("id", edu.id)
        }
      }

      for (const skill of skills) {
        if (skill.id && skill.id.startsWith("new-")) {
          const { id, ...skillData } = skill
          await supabase.from("skills").insert({
            ...skillData,
            resume_id: resume.id,
          })
        } else if (skill.id) {
          const { id, ...skillData } = skill
          await supabase.from("skills").update(skillData).eq("id", skill.id)
        }
      }

      for (const project of projects) {
        if (project.id && project.id.startsWith("new-")) {
          const { id, ...projectData } = project
          await supabase.from("projects").insert({
            ...projectData,
            resume_id: resume.id,
          })
        } else if (project.id) {
          const { id, ...projectData } = project
          await supabase.from("projects").update(projectData).eq("id", project.id)
        }
      }

      setLastSaved(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Error saving resume:", error)
      alert("Failed to save resume. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const combinedResumeData = {
    ...resumeData,
    experience: workExperience,
    education: education,
    skills: skills,
    projects: projects,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Button onClick={onBack} variant="ghost" size="sm" aria-label="Go back">
                <ArrowLeft size={20} />
              </Button>
              <Input
                value={resumeData.title}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                placeholder="Resume Title"
                className="font-semibold max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              {lastSaved && (
                <span className="text-xs text-muted-foreground hidden sm:inline">Saved at {lastSaved}</span>
              )}
              <Button onClick={saveResume} disabled={saving} className="gap-2">
                <Save size={18} />
                <span className="hidden sm:inline">{saving ? "Saving..." : "Save"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="template" className="m-0">
                  <TemplateSelector
                    selectedTemplate={resumeData.template_name || "professional"}
                    onSelectTemplate={(template) => setResumeData({ ...resumeData, template_name: template })}
                  />
                </TabsContent>

                <TabsContent value="personal" className="m-0">
                  <PersonalInfoForm resume={resumeData} setResume={setResumeData} />
                </TabsContent>

                <TabsContent value="experience" className="m-0">
                  <WorkExperienceForm experiences={workExperience} setExperiences={setWorkExperience} />
                </TabsContent>

                <TabsContent value="education" className="m-0">
                  <EducationForm education={education} setEducation={setEducation} />
                </TabsContent>

                <TabsContent value="skills" className="m-0">
                  <SkillsForm skills={skills} setSkills={setSkills} />
                </TabsContent>

                <TabsContent value="projects" className="m-0">
                  <ProjectsForm projects={projects} setProjects={setProjects} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Preview Only */}
          <div className="lg:col-span-1">
            <ResumePreview resume={combinedResumeData} />
          </div>
        </div>
      </main>

      {/* Export Section at Bottom */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ExportOptions resume={combinedResumeData} />
        </div>
      </footer>
    </div>
  )
}
