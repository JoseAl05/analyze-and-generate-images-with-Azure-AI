const computerVisionApiKey = process.env.REACT_APP_COMPUTER_VISION_KEY;

export function isAzureConfigured(){
  if(computerVisionApiKey){
    return true;
  }

  return false;
}

export async function AzureImageAnalysis(imageUrl) {
  const endpoint ='https://react-generate-analyze-img.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en';

  const uriBase = `${endpoint}`;
  const response = await fetch(uriBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': computerVisionApiKey,
    },
    body: JSON.stringify({
      url: imageUrl,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
