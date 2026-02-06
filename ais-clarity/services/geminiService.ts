
import { GoogleGenAI, Type } from "@google/genai";
import { AISEntry, Evidence, ReconciliationStatus } from "../types";

// Always use a named parameter and obtain the API key exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RECONCILIATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      description: "Classify the entry as VERIFIED, EXPLAINABLE, UNEXPLAINED, or RISK_FLAG",
    },
    explanation: {
      type: Type.STRING,
      description: "Neutral, audit-safe explanation referencing evidence. Must state if evidence is insufficient.",
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "Score from 0 to 1 representing the accuracy of this analysis.",
    },
    suggestedActualAmount: {
      type: Type.NUMBER,
      description: "The amount found in evidence, if different from AIS.",
    }
  },
  required: ["status", "explanation", "confidenceScore"],
};

export async function analyzeEntry(entry: AISEntry, evidences: Evidence[]): Promise<any> {
  // Use gemini-3-pro-preview for complex reasoning and coding tasks
  const model = 'gemini-3-pro-preview';
  
  const evidenceSummary = evidences.map(e => `- [${e.id}] ${e.name}: ${e.content || 'Binary/Document'}`).join('\n');

  const prompt = `
    Role: Senior Financial Reconciliation Analyst.
    Task: Reconcile an AIS (Annual Information Statement) entry with provided evidence metadata/content.
    
    AIS Entry Details:
    - ID: ${entry.id}
    - Section: ${entry.section}
    - Description: ${entry.description}
    - Reported Amount: ${entry.reportedAmount}
    - Reporting Entity: ${entry.reportingEntity}
    
    Evidence Available:
    ${evidenceSummary}
    
    Rules:
    1. Do not give tax advice.
    2. Do not assume intent.
    3. Use neutral, department-safe language.
    4. If evidence is insufficient to verify the full amount, state it explicitly and mark as UNEXPLAINED.
    5. If there is a timing mismatch (e.g. entry is in FY24 but income received in FY23), mark as EXPLAINABLE.
    6. If amounts match exactly, mark as VERIFIED.
    7. Reference evidence IDs [EVID-XXXX] in your explanation.
  `;

  try {
    // Call generateContent with both the model name and prompt as per guidelines
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: RECONCILIATION_SCHEMA,
        systemInstruction: "You are a professional auditor performing financial truth reconciliation. Be concise, clinical, and evidence-driven.",
      },
    });

    // Directly access the .text property of GenerateContentResponse
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
