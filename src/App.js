import React, { useState } from 'react';
import { AzureImageAnalysis, isAzureConfigured} from './azure-image-analysis';
import { AzureImageGeneration, isOpenAiConfigured } from './azure-image-generation';

function App() {
  const value = 'World';

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [data, setData] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const buttonSubmitter = e.nativeEvent.submitter.name;

    if (buttonSubmitter === 'analyze-button') {
      setIsLoading(true);
      const imageUrl = e.target.elements[0].value;
      await AzureImageAnalysis(imageUrl)
        .then((data) => {
          setData(data);
          setImage(imageUrl);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (buttonSubmitter === 'generate-button') {
      setIsLoading(true);
      const prompt = e.target.elements[0].value;
      await AzureImageGeneration(prompt)
        .then((data) => {
          console.log(data);
          setData(data);
          setImage(data.data[0].url);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if(!isAzureConfigured()){
    return (
      <main className='main-section'>
        <div className='main-section-form'>
          <h1 className='title'>Hello {value}</h1>
          <p>Missing configuration. Please add your API keys to .env file</p>
        </div>
      </main>
    );
  }

  if(!isOpenAiConfigured()){
    return (
      <main className='main-section'>
        <div className='main-section-form'>
          <h1 className='title'>Hello {value}</h1>
          <p>Missing configuration. Please add your API keys to .env file</p>
        </div>
      </main>
    );
  }

  return (
    <main className='main-section'>
      <div className='main-section-form'>
        <h1 className='title'>Hello {value}</h1>
        <form className='form-url' onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Enter a URL'
            className='form-url-input'
          />
          <div className='form-url-buttons'>
            {isLoading ? (
              <>
                <button
                  type='submit'
                  className='form-url-analyze-button'
                  disabled
                >
                  Analyzing...
                </button>
                <button
                  type='submit'
                  className='form-url-generate-button'
                  disabled
                >
                  Analyzing...
                </button>
              </>
            ) : (
              <>
                <button
                  className='form-url-analyze-button'
                  name='analyze-button'
                >
                  Analyze
                </button>
                <button
                  className='form-url-generate-button'
                  name='generate-button'
                >
                  Generate
                </button>
              </>
            )}
          </div>
        </form>
        <div className='main-section-image-container'>
          {image.length !== 0 && <img src={image} alt='User'  />}
          <div className='main-section-code-container'>
            <code className='response-data'>
              {Object.keys(data).length !== 0 ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <p>Waiting for image to be analyzed...</p>
              )}
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
