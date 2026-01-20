"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react"

export default function AIOptimizer({
  field,
  content,
  onApplySuggestion,
}: {
  field: string
  content: string
  onApplySuggestion: (suggestion: string) => void
}) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any>(null)
  const [error, setError] = useState("")

  const getOptimizations = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/optimize-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, content }),
      })

      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setSuggestions(data)
      }
    } catch (err) {
      setError("Failed to get suggestions. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={getOptimizations} disabled={loading || !content} className="w-full">
        {loading ? "Analyzing..." : "Get AI Suggestions"}
      </Button>

      {error && (
        <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle size={20} className="text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {suggestions && (
        <div className="space-y-4">
          {/* Keyword Score */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">ATS Compatibility Score</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                <div className="bg-primary h-full transition-all" style={{ width: `${suggestions.keywordScore}%` }} />
              </div>
              <span className="text-lg font-bold text-foreground">{suggestions.keywordScore}%</span>
            </div>
          </Card>

          {/* Top Keywords */}
          {suggestions.topKeywords && suggestions.topKeywords.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Recommended Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.topKeywords.map((keyword: string) => (
                  <span key={keyword} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Suggestions */}
          {suggestions.suggestions && suggestions.suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Lightbulb size={20} />
                Improvement Suggestions
              </h3>
              {suggestions.suggestions.map((suggestion: any, idx: number) => (
                <Card key={idx} className="p-4 border-primary/20">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground mb-1">{suggestion.suggestion}</p>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.reason}</p>
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                          suggestion.atsBoost === "high"
                            ? "bg-primary/20 text-primary"
                            : suggestion.atsBoost === "medium"
                              ? "bg-secondary/20 text-secondary"
                              : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        {suggestion.atsBoost} impact
                      </span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => onApplySuggestion(suggestion.suggestion)}>
                      Apply
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
