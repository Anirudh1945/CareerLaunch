"use client"

import { Card } from "@/components/ui/card"
import { getTemplateStyles } from "@/components/resume-templates"

export default function ResumePreview({ resume }: { resume: any }) {
  const templateName = resume.template_name || "professional"
  const styles = getTemplateStyles(templateName)

  return (
    <Card className="p-0 sticky top-24 overflow-hidden border border-border">
      <div
        id="resume-export-content"
        className={`${styles.container} text-sm space-y-4`}
        style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.heading}>{resume.job_role || "Your Name"}</h1>
          {resume.industry && <p className="text-gray-600 text-sm">{resume.industry}</p>}
        </div>

        {/* Professional Summary */}
        {resume.summary && (
          <div>
            <h2 className={styles.subHeading}>Professional Summary</h2>
            <p className={styles.text}>{resume.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div>
            <h2 className={styles.subHeading}>Work Experience</h2>
            {resume.experience.map((exp: any) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{exp.job_title}</p>
                    <p className="text-gray-600 text-xs">{exp.company_name}</p>
                  </div>
                  <div className="text-right">
                    {exp.start_date && (
                      <p className="text-xs text-gray-600">
                        {new Date(exp.start_date).toLocaleDateString()}
                        {exp.end_date ? ` - ${new Date(exp.end_date).toLocaleDateString()}` : " - Present"}
                      </p>
                    )}
                  </div>
                </div>
                {exp.description && <p className="text-gray-700 text-xs mt-1 whitespace-pre-wrap">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div>
            <h2 className={styles.subHeading}>Education</h2>
            {resume.education.map((edu: any) => (
              <div key={edu.id} className="mb-3">
                <p className="font-semibold text-gray-900">{edu.degree}</p>
                <p className="text-gray-600 text-xs">{edu.school_name}</p>
                {edu.field_of_study && <p className="text-gray-600 text-xs">{edu.field_of_study}</p>}
                {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div>
            <h2 className={styles.subHeading}>Projects</h2>
            {resume.projects.map((proj: any) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{proj.project_name}</p>
                    {proj.technologies && <p className="text-gray-600 text-xs">{proj.technologies}</p>}
                  </div>
                  <div className="text-right">
                    {proj.start_date && (
                      <p className="text-xs text-gray-600">
                        {new Date(proj.start_date).toLocaleDateString()}
                        {proj.end_date ? ` - ${new Date(proj.end_date).toLocaleDateString()}` : " - Present"}
                      </p>
                    )}
                  </div>
                </div>
                {proj.description && <p className="text-gray-700 text-xs mt-1 whitespace-pre-wrap">{proj.description}</p>}
                {proj.project_link && (
                  <a href={proj.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h2 className={styles.subHeading}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill: any) => (
                <span
                  key={skill.id}
                  className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium"
                >
                  {skill.skill_name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
