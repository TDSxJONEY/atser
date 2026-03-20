import OpenAI from 'openai';
import { generatePrompt } from '../utils/promptBuilder.js';

class AiService {

  async analyzeResume(resumeText, jobTitle, jobDescription) {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENROUTER_BASE_URL,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "ATS Analyzer"
      }
    });

    const prompt = generatePrompt(resumeText, jobTitle, jobDescription);

    try {
      const response = await openai.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "system", content: "Return ONLY valid JSON. No text outside JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
      });

      const content = response.choices[0].message.content;

      let parsed;

      try {
        parsed = JSON.parse(content);
      } catch {
        const match = content.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("Invalid AI response format");
        parsed = JSON.parse(match[0]);
      }

      // ✅ NORMALIZATION FUNCTION
      const normalizeScore = (value) => {
        const num = Number(value);
        if (isNaN(num)) return 0;
        return Math.max(0, Math.min(100, Math.round(num)));
      };

      // ✅ NORMALIZE SECTIONS
      const normalizedSections = {};
      const sectionKeys = ['tone', 'content', 'structure', 'skills'];

      sectionKeys.forEach(key => {
        const section = parsed.sections?.[key] || {};
        normalizedSections[key] = {
          score: normalizeScore(section.score),
          issues: Array.isArray(section.issues) ? section.issues : [],
          suggestions: Array.isArray(section.suggestions) ? section.suggestions : []
        };
      });

      // ✅ FINAL SAFE RESPONSE
      return {
        overallScore: normalizeScore(parsed.overallScore),

        summary: parsed.summary || "",

        sections: normalizedSections,

        keywordMatch: normalizeScore(parsed.keywordMatch),

        missingKeywords: Array.isArray(parsed.missingKeywords)
          ? parsed.missingKeywords
          : [],

        ats: {
          score: normalizeScore(parsed.ats?.score),
          checks: Array.isArray(parsed.ats?.checks)
            ? parsed.ats.checks
            : []
        },

        highlights: Array.isArray(parsed.highlights)
          ? parsed.highlights
          : [],

        decision: parsed.decision || {
          shortlist: false,
          reason: "No decision provided"
        }
      };

    } catch (error) {
      throw new Error('AI Analysis failed: ' + error.message);
    }
  }
}

export default new AiService();