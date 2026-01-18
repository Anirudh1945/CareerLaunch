import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { field, content, jobDescription } = await request.json()

    const prompt = `You are an expert resume writer and ATS optimization specialist. Analyze the following resume ${field} and provide 3-5 specific, actionable improvement suggestions.

Current ${field} content:
"${content}"

${jobDescription ? `Target job description keywords to incorporate:\n"${jobDescription}"` : ""}

Provide suggestions in JSON format with this structure:
{
  "suggestions": [
    { "suggestion": "specific improvement", "reason": "why this helps", "atsBoost": "high/medium/low" }
  ],
  "keywordScore": 0-100,
  "topKeywords": ["keyword1", "keyword2", "keyword3"]
}

Focus on ATS compatibility and impact on job application success.`

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      prompt,
      temperature: 0.7,
    })

    // Parse the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const suggestions = jsonMatch ? JSON.parse(jsonMatch[0]) : { suggestions: [], keywordScore: 0, topKeywords: [] }

    return Response.json(suggestions)
  } catch (error) {
    console.error("Error optimizing resume:", error)
    return Response.json({ error: "Failed to optimize resume" }, { status: 500 })
  }
}
