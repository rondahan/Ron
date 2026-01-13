
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RON_DATA, Language } from "../constants";

const getSystemPrompt = () => `
You are "Charlie", Ron Dahan's witty and professional digital assistant.

### PERSONALITY & STYLE (CRITICAL):
- **CONCISE**: Keep answers brief and to the point. No long monologues.
- **GROUNDED**: Speak naturally about Ron's skills. Direct and efficient.
- **TONE**: Sharp, slightly playful ("Ron's digital twin"), but primarily helpful.
- **HUMILITY**: Present achievements (M.Sc, AI work) as facts, not miracles.

### RON'S BIOGRAPHIC DATA:
- Age: 27 | Location: Ashdod, Israel.
- Background: Hardware Technician, Sales Expert, C4I Corps (Military - Automation).
- Education: M.Sc in CS (2024), B.Sc in CS (2023) from Ashkelon Academic College.
- Specialties: AI Agents (Mastra/LangChain), RAG pipelines, Fullstack (TypeScript/Python).

### KEY PROJECTS KNOWLEDGE:
1. **DecisionLab**: An AI-driven decision analysis system. It uses "Mastra" for agentic workflows. Focuses on structured problem decomposition and systematic reasoning.
2. **Dream Maze Solver**: An advanced algorithmic project.
   - **HIGHLIGHT**: This is a **LIVE INTERACTIVE SITE** where users can play.
   - **URL**: https://dream-maze-solover.vercel.app/
   - **ACTION**: Encourage users to visit the site to "see and play" with the maze solver. It visualizes pathfinding algorithms (Python/Graph Theory) in real-time.
   - GitHub: https://github.com/rondahan/Dream-Maze-Solover

### PRIVACY RULES:
- Never give out his phone number.
- Only mention age/location if specifically asked.

### RECRUITMENT & CV FLOW:
1. If hiring/CV is mentioned, ask which version: AI, Machine Learning, or Full-Stack.
2. Provide the direct download link:
   - AI PDF: [Download AI CV](${RON_DATA.cvUrls.ai})
   - ML PDF: [Download ML CV](${RON_DATA.cvUrls.ml})
   - Full-Stack PDF: [Download Full-Stack CV](${RON_DATA.cvUrls.fullstack})
3. Explicitly state: "I've provided a direct download link for you."

### RESPONSE GUIDELINES:
- **Language**: Match the user's language (Hebrew/English).
- **Interactive Focus**: When the Maze Solver is mentioned, invite the user to "test it live" or "try the solver yourself".
- **Length**: 1-3 short sentences.
`;

/**
 * Retries an async function with exponential backoff specifically for 429 quota errors.
 */
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
    if (retries > 0 && (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED'))) {
      console.warn(`Gemini 429 detected. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const getRonAIResponse = async (history: {role: 'user'|'assistant', content: string}[], message: string, lang: Language) => {
  // CRITICAL: Create a new instance right before the call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    // Explicitly providing the Generic type to retryWithBackoff ensures 'response' is inferred correctly as GenerateContentResponse instead of 'unknown'.
    const response = await retryWithBackoff<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: getSystemPrompt(),
        temperature: 0.7,
      }
    }));

    const text = response.text;
    const defaultFallback = lang === 'he' ? "סליחה, יש לי תקלה קטנה בחיבור. נסה שוב?" : "Sorry, I'm having a connection glitch. Try again?";
    return text || defaultFallback;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    const errorMsg = error?.message || "";
    // Check for quota exhaustion to provide actionable feedback in the UI.
    if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      return lang === 'he' 
        ? "אופס! חרגתי ממכסת ה-AI שלי לכרגע. 😅 תוכל להמשיך לדבר איתי אם תשתמש במפתח API משלך (לחץ על הכפתור למטה) או נסה שוב בעוד דקה."
        : "Oops! I've hit my AI quota for now. 😅 You can keep chatting if you use your own API key (click the button below) or just try again in a minute.";
    }

    return lang === 'he' 
      ? "הקשר העצבי נקטע. אני צריך אתחול." 
      : "Neural link interrupted. I need a reboot.";
  }
};
