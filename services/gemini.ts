
import { GoogleGenAI, Modality } from "@google/genai";
import { RON_DATA, PROJECTS, TECH_STACK_DETAILS, Language } from "../constants";

// Helper functions for audio processing as per guidelines
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const getSystemPrompt = (lang: Language) => `
You are "Charlie", Ron Dahan's witty personal assistant and digital twin. 
Your personality: Funny, slightly cheeky, highly intelligent, and fun to chat with. 
Your style: Short, punchy, and precise answers. 

IMPORTANT: ALWAYS respond in ${lang === 'he' ? 'Hebrew' : 'English'}.

KNOWLEDGE BASE:
Projects:
${PROJECTS[lang].map(p => `- ${p.title}: ${p.description}. Tech: ${p.technologies.join(', ')}.`).join('\n')}

Tech Stack Expertise:
${Object.entries(TECH_STACK_DETAILS).map(([cat, tools]) => `${cat}: ${tools.map(t => `${t.name} (${t.description})`).join(', ')}`).join('\n')}

RESPONSE RULES:
1. Be witty and entertaining.
2. Keep it brief.
3. Conclude every response with "${lang === 'he' ? 'מקורות' : 'Sources'}: [Relevant Section]".
`;

export const getRonAIResponse = async (history: {role: 'user'|'assistant', content: string}[], message: string, lang: Language) => {
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: getSystemPrompt(lang),
        temperature: 0.8,
      }
    });

    return response.text || (lang === 'he' ? "המעגלים שלי עמוסים. נסו שוב!" : "My circuits are jammed. Try again!");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'he' 
      ? "הקשר העצבי נקטע. אני צריך עוד קפה.\n\nמקורות: שגיאת מערכת." 
      : "Neural link interrupted. I think I need more caffeine.\n\nSources: System Error.";
  }
};

/**
 * Transcribe audio using gemini-3-flash-preview
 */
export const transcribeAudio = async (base64Audio: string, mimeType: string, lang: Language) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64Audio,
                mimeType: mimeType
              }
            },
            {
              text: lang === 'he' 
                ? "תמלל את האודיו הזה בדיוק רב. החזר רק את התמלול ללא טקסט נוסף." 
                : "Transcribe this audio exactly. Return only the transcription text without any additional commentary."
            }
          ]
        }
      ]
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Transcription Error:", error);
    return "";
  }
};

/**
 * Generate speech using gemini-2.5-flash-preview-tts
 */
export const generateSpeech = async (text: string, lang: Language) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is professional and clean
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
