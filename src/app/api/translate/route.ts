import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLanguage, targetLanguage' },
        { status: 400 }
      );
    }

    if (sourceLanguage === targetLanguage) {
      return NextResponse.json({ translatedText: text });
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the given text from ${sourceLanguage} to ${targetLanguage}. Only return the translated text without any explanations, notes, or additional commentary. Preserve the original formatting, tone, and style. If the text contains proper nouns, brand names, or terms that should not be translated, keep them as-is.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
    });

    const translatedText = completion.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ translatedText });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Translation failed';
    console.error('Translation error:', message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
