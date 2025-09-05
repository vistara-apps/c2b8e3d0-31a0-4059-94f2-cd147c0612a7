import OpenAI from 'openai';
import { ChatMessage, ScriptGenerationRequest } from './types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateLegalScript(request: ScriptGenerationRequest): Promise<{
  whatToSay: string[];
  whatNotToSay: string[];
}> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a legal expert specializing in civil rights and police interactions. 
      Generate practical, legally sound advice for citizens during police encounters.
      Focus on de-escalation and constitutional rights protection.
      Provide responses in ${request.language === 'es' ? 'Spanish' : 'English'}.`
    },
    {
      role: 'user',
      content: `Generate specific "what to say" and "what not to say" scripts for a police encounter in ${request.state} involving: ${request.scenario}. 
      
      Format the response as JSON with two arrays:
      - "whatToSay": 4-5 specific phrases to use
      - "whatNotToSay": 4-5 things to avoid saying or doing
      
      Keep phrases concise and practical for high-stress situations.`
    }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages,
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const parsed = JSON.parse(content);
    return {
      whatToSay: parsed.whatToSay || [],
      whatNotToSay: parsed.whatNotToSay || []
    };
  } catch (error) {
    console.error('Error generating legal script:', error);
    
    // Fallback to default scripts
    const fallback = {
      en: {
        whatToSay: [
          "I am exercising my right to remain silent",
          "I do not consent to any searches",
          "Am I free to leave?",
          "I want to speak to a lawyer"
        ],
        whatNotToSay: [
          "Don't argue or resist physically",
          "Don't lie or provide false information", 
          "Don't consent to searches",
          "Don't answer questions without a lawyer"
        ]
      },
      es: {
        whatToSay: [
          "Estoy ejerciendo mi derecho a permanecer en silencio",
          "No consiento ningún registro",
          "¿Soy libre de irme?",
          "Quiero hablar con un abogado"
        ],
        whatNotToSay: [
          "No discutas o resistas físicamente",
          "No mientas o proporciones información falsa",
          "No consientas registros", 
          "No respondas preguntas sin un abogado"
        ]
      }
    };

    return fallback[request.language];
  }
}

export async function generateStateGuide(state: string, language: 'en' | 'es'): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a legal expert specializing in state-specific civil rights laws.
      Provide accurate, up-to-date information about citizen rights during police encounters.
      Focus on practical guidance that citizens can use to protect themselves legally.
      Provide responses in ${language === 'es' ? 'Spanish' : 'English'}.`
    },
    {
      role: 'user',
      content: `Generate a comprehensive but concise guide for citizen rights during police encounters in ${state}.
      
      Include:
      - Key state-specific laws and rights
      - Practical steps to take during encounters
      - Important legal protections unique to ${state}
      - Emergency contact information guidelines
      
      Keep it under 300 words and focus on actionable advice.`
    }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages,
      temperature: 0.2,
      max_tokens: 400,
    });

    return completion.choices[0]?.message?.content || 'Guide generation failed. Please try again.';
  } catch (error) {
    console.error('Error generating state guide:', error);
    return `Basic rights guide for ${state}. You have the right to remain silent, refuse searches without a warrant, and request an attorney. Always remain calm and respectful during police encounters.`;
  }
}
