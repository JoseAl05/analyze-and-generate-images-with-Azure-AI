import OpenAI from 'openai';

const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export function isOpenAiConfigured() {
  if (openAiApiKey) {
    return true;
  }

  return false;
}

const openai = new OpenAI({
  apiKey: openAiApiKey,
  dangerouslyAllowBrowser: true,
});

export async function AzureImageGeneration(userPrompt) {
  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: userPrompt,
    n: 1,
    size: '256x256',
  });

  return response;
}
