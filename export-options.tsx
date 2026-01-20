"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, File, AlertCircle } from "lucide-react"

export default function ExportOptions({ resume }: { resume: any }) {
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState("")

  const exportPDF = async () => {
    setExporting(true)
    setExportError("")
    try {
      const element = document.getElementById("resume-export-content")
      if (!element) {
        throw new Error("Resume content not found")
      }

      const html2pdf = (await import("html2pdf.js")).default

      // Clone the element and strip all CSS custom properties to avoid oklch color issues
      const cloned = element.cloneNode(true) as HTMLElement
      const style = document.createElement("style")
      style.textContent = `
        * {
          color: #000000 !important;
          background-color: transparent !important;
          border-color: #cccccc !important;
        }
        body { background-color: #ffffff !important; }
        h1, h2, h3, h4, h5, h6 { color: #000000 !important; }
      `
      cloned.appendChild(style)

      const opt = {
        margin: 10,
        filename: `${resume.title || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
          windowHeight: element.scrollHeight,
          windowWidth: element.scrollWidth,
          onclone: (doc: Document) => {
            const docStyle = doc.createElement("style")
            docStyle.textContent = `
              * { color: #000000 !important; background-color: transparent !important; }
              body { background-color: #ffffff !important; }
            `
            doc.head.appendChild(docStyle)
          },
        },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      }

      await new Promise((resolve, reject) => {
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(resolve)
          .catch(reject)
      })
    } catch (error) {
      console.error("[v0] PDF export error:", error)
      setExportError("Failed to export PDF. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  const exportWord = async () => {
    setExporting(true)
    setExportError("")
    try {
      const element = document.getElementById("resume-export-content")
      if (!element) {
        throw new Error("Resume content not found")
      }

      // Get plain text content for better Word document compatibility
      const text = element.innerText

      const docContent = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<style>
body { font-family: Calibri, sans-serif; line-height: 1.5; margin: 20px; }
h1 { font-size: 24px; margin: 10px 0; font-weight: bold; }
h2 { font-size: 14px; font-weight: bold; margin: 10px 0 5px 0; border-bottom: 1px solid #cccccc; padding-bottom: 5px; }
p { margin: 5px 0; font-size: 11px; }
div { margin: 10px 0; }
</style>
</head>
<body>
<pre>${text}</pre>
</body>
</html>
      `

      const blob = new Blob([docContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resume.title || "resume"}.docx`
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      console.log("[v0] Word export successful")
    } catch (error) {
      console.error("[v0] Error exporting Word:", error)
      setExportError("Failed to export Word document. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  const exportText = async () => {
    setExporting(true)
    setExportError("")
    try {
      const element = document.getElementById("resume-export-content")
      if (!element) {
        throw new Error("Resume content not found")
      }

      const text = element.innerText
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resume.title || "resume"}.txt`
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      console.log("[v0] Text export successful")
    } catch (error) {
      console.error("[v0] Error exporting text:", error)
      setExportError("Failed to export text file. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <Download size={18} />
        Export Resume
      </h3>

      {exportError && (
        <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle size={16} className="text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive">{exportError}</p>
        </div>
      )}

      <div className="space-y-2">
        <Button
          onClick={exportPDF}
          disabled={exporting}
          className="w-full justify-start bg-transparent"
          variant="outline"
        >
          <File size={16} className="mr-2" />
          PDF
        </Button>
        <Button
          onClick={exportWord}
          disabled={exporting}
          className="w-full justify-start bg-transparent"
          variant="outline"
        >
          <File size={16} className="mr-2" />
          Word Document
        </Button>
        <Button
          onClick={exportText}
          disabled={exporting}
          className="w-full justify-start bg-transparent"
          variant="outline"
        >
          <File size={16} className="mr-2" />
          Plain Text
        </Button>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded p-3">
        <p className="text-xs text-muted-foreground">
          All exports use your current resume design. Save your resume before exporting to ensure all changes are
          included.
        </p>
      </div>
    </Card>
  )
}
