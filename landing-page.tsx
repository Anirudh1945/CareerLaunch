"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AuthModal from "@/components/auth-modal"

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur-sm z-40">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">CareerLaunch</div>
          <Button
            onClick={() => {
              setAuthMode("signin")
              setShowAuth(true)
            }}
            variant="outline"
          >
            Sign In
          </Button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance">
            Create Your Perfect Resume with AI
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Build a professional resume optimized for applicant tracking systems. Get intelligent suggestions, multiple
            templates, and instant formatting adjustments.
          </p>
          <Button
            size="lg"
            onClick={() => {
              setAuthMode("signup")
              setShowAuth(true)
            }}
            className="w-full sm:w-auto"
          >
            Start Building Your Resume
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">
          <FeatureCard
            title="AI-Powered Optimization"
            description="Get intelligent suggestions for better keywords, formatting, and content that matches job descriptions."
          />
          <FeatureCard
            title="ATS-Friendly Templates"
            description="Professional templates optimized for applicant tracking systems to ensure your resume passes through filters."
          />
          <FeatureCard
            title="Multiple Export Formats"
            description="Export your resume as PDF, Word, or plain text. Share directly or download for any application."
          />
          <FeatureCard
            title="Industry-Specific Designs"
            description="Choose from templates optimized for tech, finance, creative, and other industries."
          />
          <FeatureCard
            title="Real-Time Preview"
            description="See exactly how your resume will look as you build it. Live formatting updates."
          />
          <FeatureCard
            title="Save & Sync"
            description="Create multiple resume versions for different roles. All your data is securely saved."
          />
        </div>

        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 max-w-2xl mx-auto">
            <FAQItem
              question="Is my resume data secure?"
              answer="Yes. All your data is encrypted and stored securely on Supabase with Row Level Security policies."
            />
            <FAQItem
              question="Can I export to different formats?"
              answer="You can export your resume as PDF, Word (.docx), or plain text (.txt) files."
            />
            <FAQItem
              question="How does AI optimization work?"
              answer="Our AI analyzes your resume content and provides suggestions to improve ATS compatibility and match job descriptions."
            />
            <FAQItem
              question="Can I create multiple resumes?"
              answer="Yes! Create unlimited resumes and customize each one for different roles or industries."
            />
          </div>
        </section>
      </main>

      {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onModeChange={setAuthMode} />}
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <details
      className="group border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      open={open}
      onToggle={() => setOpen(!open)}
    >
      <summary className="font-medium text-foreground flex items-center justify-between">
        {question}
        <span className="transition-transform group-open:rotate-180">▼</span>
      </summary>
      <p className="mt-3 text-muted-foreground text-sm">{answer}</p>
    </details>
  )
}
